import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

export default class Statistic {
    getHomeCount(){
        return _mm.request({
            url : '/manage/statistic/base_count.do'
        })
    }
}
