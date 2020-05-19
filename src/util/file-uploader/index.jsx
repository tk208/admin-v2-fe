import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';

export default class FileUploader extends Component {

    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess : (res) => this.props.onSuccess(res.data),
            uploadError : (err) => this.props.onError(err.message || '上传图片出错了')
        }
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}
