import { Client } from 'api-delivery-js';
import { Configuration } from '../config';
import { LruCache } from './lru-cache';

export const client = process.env.NODE_ENV !== 'production' ? Client.create(Configuration) : Client.create();
export * from 'api-delivery-js';

export const versionStatus = client.clientConfig.versionStatus === 'latest' ? 'latest' : 'published';

class CachedSearch {

	cache = new LruCache();
	taxonomyLookup = {};

	search(query) {
		return this.request(JSON.stringify(query), () => client.entries.search(query, 1));
	}
	
	getContentType(id) {
		return this.request(`[CONTENT TYPE] ${id}`, () => client.contentTypes.get(id));
	}

	getTaxonomyNode(key) {
		return this.request(`[TAXONOMY NODE] ${key}`, 
			() => client.taxonomy.resolveChildren(key)
					.then(node =>  this.extendTaxonomyNode(node))
		);
	}

	request(key, execute) {
		if (!this.cache.get(key)) {
			let promise = execute();
			this.cache.set(key, promise);
			promise.catch(() => {
				this.cache.remove(key);
			});
		}
		return this.cache.get(key);
	}

	extendTaxonomyNode(node) {
		let id = this.getTaxonomyId(node);
		this.taxonomyLookup[id] = node.key;
		return {
			...node,
			id,
			children: (!!node.children) ? node.children.map(n => this.extendTaxonomyNode(n)) : null
		}
	}

	getTaxonomyId(node) {
		if (node.key) {
			let parts = node.key.split('/');
			return parts[parts.length - 1];
		}
		return '';
	}

	getTaxonomyKey(id) {
		return this.taxonomyLookup[id];
	}
}

export const cachedSearch = new CachedSearch();