module.exports = [{
		type: 'input',
		name: 'rootUrl',
		message: 'Enter your CMS Url',
		default: 'https://cms-kcl-uat.cloud.contensis.com' //'https://cms-develop.cloud.contensis.com'
	},
	{
		type: 'input',
		name: 'projectId',
		message: 'Enter your Project ID',
		default: 'website'
	},
	{
		type: 'input',
		name: 'accessToken',
		message: 'Enter your Access Token',
		default: 'JjV9NgvYm8BQgTNx2AtThsRBeK5qZxArDnRc2SKrzYWzvsS6' //'gJpUHbj3HEO8u7mTzEgIqI5gTN1K5Y6DUZSPwmSMOzzDl7cB'
	},
	{
		type: 'input',
		name: 'contentTypeId',
		message: 'Enter the Content Type ID for the listing',
		default: 'courses' // 'news'
	},
	{
		type: 'input',
		name: 'projectName',
		message: 'Enter your Project Name for syncing',
		default: 'Website'
	},
	{
		type: 'input',
		name: 'userName',
		message: 'Enter your User Name for syncing',
		default: 'Zengenti'
	},
	{
		type: 'password',
		name: 'password',
		message: 'Enter your Password for syncing',
		default: 'SHaRkRPtypOOBC0f' //'kdEy8cROjdcVVpTP'
	},
	{
		type: 'input',
		name: 'folder',
		message: 'Enter your Folder Path for syncing',
		default: 'site-elements' // 'TESTING/Dan/contensis-cli/js'
	}
];