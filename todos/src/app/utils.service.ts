import {Injectable} from '@angular/core';
declare let require: any;
const moment = require('moment/moment');
interface DateRange {
    start: string;
    end: string;
}
@Injectable()
export class UtilsService {
    constructor() {
    }

    static datesFromDateRange(dateRange, format: string = 'YYYY-MM-DD') {
        const dates = [];
        let date = moment(dateRange.start);
        while (date.isSameOrBefore(dateRange.end)) {
            dates.push(date.format(format));
            date = date.add(1, 'day');
        }
        return dates;
    }

    findMaxInArray(array: Array<Object>, key: string) {
        let max = 0;
        array.forEach(function (item) {
            max = Math.max(max, +item[key]);
        });
        return max;
    }

    sumInArray(array: Array<Object|number>, key?: string) {
        let sum = 0;
        array.forEach(function (item) {
            if (key && item[key]) {
                sum += +item[key];
            } else if (item) {
                sum += +item;
            }
        });
        return sum;
    }

    message (text, bgColor?, closeTime = 1500) {
        if(!text){
            return false;
        }
        bgColor = bgColor ? '#5FD591' : '#FD7166';
        let div = document.createElement('div');
        let span = document.createElement('span');
        div.appendChild(span);
        span.innerText = text;
        style();
        document.body.appendChild(div);

        // 自动关闭
        let clear = setTimeout(function () {
            span.style.opacity = '0';
            const time = setTimeout(function(){
                document.body.removeChild(div)
            }, 300);
        }, closeTime);

        function style() {
            div.style.textAlign = 'center';
            div.style.position = 'fixed';
            div.style.top = '20px';
            div.style.left = '50%';
            div.style.transform = 'translateX(-50%)';
            div.style.zIndex = '99999';
            span.style.borderRadius = '4px';
            span.style.display = 'inline-block';
            span.style.padding = '10px 50px';
            span.style.minWidth = '200px';
            span.style.fontSize = '14px';
            span.style.fontWeight = '700';
            span.style.transition = '0.3s';
            span.style.color = '#fff';
            span.style.background = bgColor;
        }
    }

    toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    toQueryString(obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    orderBy(list, key){
        if(!list){
            return false;
        }
        let type = 'asc';
        if(key.indexOf('-') === 0){
            type = 'desc';
            key = key.slice(1);
        }
        if(list instanceof Array){
            list.sort(function (a, b) {
                if(type === 'asc'){
                    return a[key]-b[key];
                } else if(type === 'desc'){
                    return b[key]-a[key];
                }
            });
        }
        return list;
    }

    findIndexByKeyValue (arr, oldKey, oldValue) {
        let result = -1;
        if(!arr || !oldKey){
            return result;
        }
        arr.some && arr.some((v, i) => {
            if (result === -1) {
                for (let _key in v) {
                    if (_key === oldKey && v[_key] === oldValue) {
                        result = i;
                        break
                    }
                }
            }
        });
        return result;
    }

    getErrorMessage(errors) {
        let errorMessage = '';
        let first = '';
        for(let key in errors){
            for (let i of errors[key]) {
                errorMessage += i + '<br>';
                !first && (first = i);
            }
        }
        errorMessage += '请检查以上字段。';
        return {
            errorMessage: errorMessage,
            first: first
        };
    }

    getFormError(result){
        let res = result['message'] || '';
        if(result.errors){
            for(let [, value] of Object.entries(result.errors)){
                res += value;
            }
        }
        return res;
    }

    typeNumber(value) {
        if(!value){
            return '';
        }
        value += '';
        let res = value.replace(/[^0-9]*/g, '');
        let temp = res.length % 3;
        switch (temp) {
            case 1:
                res = '00' + res;
                break;
            case 2:
                res = '0' + res;
                break;
        }
        res = res.match(/\d{3}/g);
        if(!res){
            return '';
        }
        res = res.join(',').replace(/^0+/, '');
        return res;
    }

    getFileSize(limit) {
        if(!limit){
            return false;
        }
        let size = '';
        if ( limit < 0.1 * 1024 ) {
            size = limit + 'B';
        } else if (limit < 0.1 * 1024 * 1024 ) {
            size = (limit / 1024).toFixed(2) + 'KB';
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
        } else {
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }
        return size;
    }

    getSearchQuery(...items){
        console.log(items);
    }
}
