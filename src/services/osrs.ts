import axios from '../plugins/axios'

export default axios.create({
	baseURL:
		'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=',
	timeout: 2000
})
