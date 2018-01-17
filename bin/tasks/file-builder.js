const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function loadTemplate(name) {
	let contents = fs.readFileSync(name, 'utf-8'); //path.join(__dirname, '..', 'template', name), 'utf-8')
	
	return {
		writeFile(path, locals) {
			try {
				let newContents = ejs.render(contents, locals);
				fs.writeFileSync(path, newContents);
			} catch (e) {
				console.log(e);
			}
		}
	};  
}

function getDestFileName(locals, file) {
	if (file === '__listing__.js') {
		return `${locals.contentTypeName}Listing.js`;
	}
	if (file === '__record__.js') {
		return `${locals.contentTypeName}Record.js`;
	}
	return file;
}

function copyFolder(srcDir, destDir, locals) {
	if (destDir) {
		console.log('Creating Folder: ', destDir);
		fs.mkdirSync(destDir);
	}
	let list = fs.readdirSync(srcDir);
	list.forEach(function(file) {
		let src = srcDir + '/' + file;
		let dest = getDestFileName(locals, file);
		dest = (!!destDir) ? destDir + '/' + dest : dest;
        let stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
			copyFolder(src, dest, locals);
		} else {
			console.log('Creating File: ', dest);
			let template = loadTemplate(src);
			template.writeFile(dest, locals);
		}
    });
}

function getProperty(o, props, defaultValue) {
	if (!o) {
		return defaultValue;
	}
	if (props.length === 0) {
		return o;
	}
	o = o[props[0]];
	return getProperty(o, props.slice(1), defaultValue);
}

function render(name, dataType, dataFormat, renderWrapper, field) {
	dataType = (dataType || '').toLowerCase();
	dataFormat = (dataFormat || '').toLowerCase();

	if (dataType.toLowerCase().endsWith('array')) {
		let itemType = dataType.substr(0, dataType.length - 5);
		return `<ul>
	{${name}.map((item, index) => (<li key={index}>${render('item', itemType, dataFormat, false, field)}</li>))}
</ul>`;
	}

	let wrapperTag = 'p';
	let result = '';	

	// dataFormat field, markdown, taxonomy, component

	if (dataFormat === 'asset') {
		result = `<a href={${name}.sys.uri}>{${name}.entryTitle}</a>`;
	}

	if (dataFormat === 'daterange') {
		return `<h3>From</h3>
<p>{${name}.from}</p>
<h3>To</h3>
<p>{${name}.to}</p>`;
	}

	if (dataFormat === 'entry') {
		result = '<a href={`#/${' + name + '.sys.id}`}>{' + name + '.entryTitle}</a>';
	}

	if (dataFormat === 'heading') {
		let size = getProperty(field, ['editor', 'properties', 'size'], 'medium');
		wrapperTag = (size === 'small') 
			? 'h4'
			: ((size === 'medium') ? 'h3' : 'h2');
	}

	if (dataFormat === 'html') {
		return `<p dangerouslySetInnerHTML={{ __html: ${name} }}></p>`;
	}

	if (dataFormat === 'image') {
		result = `<img src={${name}.asset.sys.uri} alt={${name}.caption} />`;
	}

	if (dataFormat === 'location') {
		return `<h3>Lat</h3>
<p>{${name}.lat}</p>
<h3>Lon</h3>
<p>{${name}.lon}</p>`;
	}

	if (dataFormat === 'quote') {
		return `<h3>Text</h3>
<p>{${name}.text}</p>
<h3>Source</h3>
<p>{${name}.source}</p>`;
	}

	if (dataFormat === 'taxonomy') {
		return `<p>{${name}.name}</p>`;
	}

	result = result || `{JSON.stringify(${name})}`;	
	return renderWrapper ? `<${wrapperTag}>${result}</${wrapperTag}>` : result;
}

function renderField(field) {
	return render(`entry.${field.id}`, field.dataType, field.dataFormat, true, field);
}

exports.copyTemplates = function(settings) {
	return new Promise((resolve, reject) => {
		try {
			let locals = Object.assign({}, { renderField: renderField }, settings);
			let srcDir = path.join(__dirname, '..', 'template');
			copyFolder(srcDir, '', locals);
			resolve(locals);
		} catch (e) {
			reject(e);
		}
	});
	
};