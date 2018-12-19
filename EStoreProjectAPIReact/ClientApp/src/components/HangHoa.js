//componets/HangHoa.js
import React, { Component } from 'react';

export class HangHoa extends Component {
    render() {
        const {
            maHh, tenHh, donGia, hinh
        } = this.props.hangHoaInfo;
        return (
            <div className="col-10 mx-auto col-md-6 col-lg-4">
                <div>
                    <img src={hinh} className="hanghoa" />
                </div>
                <div>
                    <h5>{tenHh}</h5>
                    <h6 className="text-danger">{donGia}</h6>
                    <button className="btn btn-primary"
                        onClick={() => this.props.cart(this.props.hangHoaInfo)}>
                        Mua</button>
                    <button className="btn btn-success"
         onClick={() => this.props.handleDetail(maHh)}>
                        Chi tiết</button>
                </div>
            </div>
        );
    }
}
