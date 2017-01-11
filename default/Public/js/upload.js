/**
 * Created by huqiwen on 16/9/6.
 */
var upLoadData = [],
    upLoadBase = [],
    reBackUrl = [],
    domNum = 0;//根据该参数判断增加了几张图片，该值不超过3;
$(".init_header >div").delegate(".file_input", "change", function () {
    var that = $(this),
        file = this.files[0];
    if (!file) {
        return;
    }
    this.value = "";
    var URL = window.URL || window.webkitURL;
    if (!URL) {
        return;
    }
    var img = new Image(), width, height, bg;
    $('#loading').show();

    //设置img url
    img.src = URL.createObjectURL(file);

    img.onload = function () {
        var imgForm = new FormData();
        var _length = upLoadData.length;
        for (var i = 0; i < _length; i++) {
            if (upLoadData[i].name == file.name) {
                return;
            }
        }
        if (this.width > 320) {
                    var max = 320, w, h;
                    w = this.width;
                    h = this.height;
                    this.width = max;
                    this.height = h * max / w;
                }
        var imgForm = new FormData();
        amendImage(img, function (data) {
            imgForm.append("face", file);
            upLoadAjax(imgForm, data);
        });

    }
    //
    //var img = new Image(), width, height, bg;
    //
    //
    //
    //
    ////设置img url
    //img.src = URL.createObjectURL(file);
    //
    //img.onload = function () {
    //    var imgForm = new FormData();
    //    var _length = upLoadData.length;
    //    for (var i = 0; i < _length; i++) {
    //        if (upLoadData[i].name == file.name) {
    //            return;
    //        }
    //    }
    //
    //    /*
    //     * 数据处理前，先对图片进行缩放
    //     * 原尺寸图片在进行数据转换的时候部分手机会处理不了
    //     * 设定了宽为800,高度等比缩放
    //     */
    //    if (this.width > 800) {
    //        var max = 800, w, h;
    //        w = this.width;
    //        h = this.height;
    //        this.width = max;
    //        this.height = h * max / w;
    //    }
    //    upLoadData[domNum] = file;
    //    amendImage(img, function (data) {
    //        domNum++;
    //        //if (upLoadType == "form") {
    //            imgForm.append("file", file);
    //            upLoadAjax(imgForm, data);
    //        //} else {
    //        //    upLoadBase[domNum] = data;
    //        //    upLoadAjax(data, data);
    //        //}
    //
    //    });
    //};

    URL.revokeObjectURL(file);

});
//}

function getImgData(img) {
    var canvas, ctx;
    canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL('image/png', 0.7);
}


function amendImage(img, callback) {
    EXIF.getData(img, function () {
        //获取图片的相关信息
        //ps:图片会有很多基本信息，如作者，拍摄设备，这里获取拍摄设备状态
        //有些设备相关信息不标准，该处理后图片会不正常会直接调用getImageDage方法
        //ios6在处理过程中会有问题，目前不兼容
        var orientationEXIF = (EXIF.pretty(this)).match(/Orientation : (\d)/),
            orientation = orientationEXIF ? +orientationEXIF[1] : 1;

        //alert(orientation);
        var width = img.width, height = img.height, canvas, xtx;
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        switch (orientation) {
            case 3:
                ctx.rotate(180 * Math.PI / 180);
                ctx.drawImage(img, -width, -height, width, height);
                break;

            case 6:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(img, 0, -height, width, height);
                break;

            case 8:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(270 * Math.PI / 180);
                ctx.drawImage(img, -width, 0, width, height);
                break;

            default:
                ctx.drawImage(img, 0, 0, width, height);
        }
        if (callback) {
            callback(canvas.toDataURL('image/png', 0.7));
        }
    });

}


//上传图片
function upLoadAjax(imgDate, base) {
    if (imgDate == "") return;
    if (base == "") return;
    $.ajax({
        url: UPLOAD_URL,
        type: "POST",
        data: imgDate,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (data) {
            $('#loading').hide();
            if (data.status) {
                $(".init_Img").attr("src",base);
                $('#face_tag').val(data.data);
            } else {
                alert('上传头像失败，请重试');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { //error
            console.log(XMLHttpRequest + "----" + textStatus + "---" + errorThrown);
        },
        complete: function () {
        }
    });
}