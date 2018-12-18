//src/components/ThemLoai.js
import React, { Component } from 'react';
import axios from 'axios';
export class ThemLoai extends Component {
    constructor(props) {
        super(props);
        this.state = {"ThongBao":""}
    }
    fieldOnChange = sender => {
        let fieldName = sender.target.name;
        let value = sender.target.value;
        let state = this.state;
        this.setState({
            ...state,
            fields: { ...state.fields, [fieldName]: value }
        });
        console.log(this.state.fields);
    }

    filesOnChange = sender => {
        let files = sender.target.files;
        let state = this.state;
        this.setState({
            ...state,
            files: files
        });
    }

    uploadForm = event => {
        event.preventDefault();
        this.setState({
            ...this.state, ThongBao : "Đang thực hiện"
        });

        //nếu chưa chọn file thì thông báo
        if (!this.state.hasOwnProperty("files")) {
            this.setState({
                ...this.state, ThongBao: "Vui lòng chọn file"
            });
            return;//ngừng
        }

        //tạo form gửi lên (tại vì có file)
        let form = new FormData();
        for (var i = 0; i < this.state.files.length; i++) {
            var element = this.state.files[i];
            form.append('file', element);//name, value
        }
        for (var key in this.state.fields) {
            if (!this.state.hasOwnProperty(key)) {
                form.append(key, this.state.fields[key]);
            }
        }

        //gọi API
        axios.post('api/loais/uploader/upload', form)
            .then((result) => {
                let message = "Success!"
                if (!result.data.success) {
                    message = result.data.message;
                }
                this.setState({
                    ...this.state,
                    ThongBao: message
                });
            })
            .catch((ex) => {
                console.error(ex);
            });

    }//end uplodForm

    render() {
        return (
            <div>
                <form>
                    <h2>Form</h2>
                    <p><b>{this.state.ThongBao}</b></p>
                    <div><input name="tenLoai" type="text" placeholder="Tên loại" onChange={this.fieldOnChange} /></div>
                    <textarea name="moTa" onChange={this.fieldOnChange} rows="5" />
                    <div><input type="file" onChange={this.filesOnChange} multiple /></div>
                    <button onClick={this.uploadForm}>
                        Thêm loại
                    </button>
                </form>
            </div>
        );
    }
}