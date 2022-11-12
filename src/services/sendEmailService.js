require('dotenv').config();
import nodemailer from 'nodemailer'


let sendEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: '"CyberLearn " <cyberlearn@gmail.com>',
        to: data.studentEmail,
        subject: `[Cyberlearn] Thông báo đăng ký thành công khoá học: "${data.subjectName}"`,
        text: ``,
        html: `
        <p>${data.studentName} thân mến, </p>

        <p>Cyberlearn xác nhận bạn đã đăng ký thành công khóa học : <b>
        "${data.subjectName}"
        </b></p>

        <p>Thời gian đăng ký: ${data.realTime}</p>

        <p>Dưới đây là một số thông tin lớp học của bạn :</p>

        <ul>

            <li>
                Khóa học: <b>${data.subjectName}</b>
            </li>
            <li>
                Thời gian khai giảng dự kiến: ${data.time} .
            </li>
            <li>
                Thời lượng học: <b>${data.timeStudy}</b>
            </li>
            <li>
                Học phí: <b>${data.price}</b>
            </li>
        </ul>
        <p>Thông tin nhập học được đính kèm file ở dưới.</p>
        <p>Một lần nữa Cyberlearn rất vui mừng vì được đồng hành và hỗ trợ bạn trong thời gian sắp tới. Chúc bạn sẽ có thời gian học tập và những trải nghiệm tuyệt vời nhất cùng Cyberlearn.</p>

        <br/>
        <p>Trân trọng!</p>
        <p>Cyberlearn</p>
        <br />
        --

        <b>T:  (84)0762766682 │ E: chienhoo20@gmail.com</b>

        <br/>

        <p>
        Nếu tất cả cá thông tin trên đều đúng vui lòng
        <a href=${data.link} target="_blank">Click here </a>
        để xác nhận .
        </p>

        `,
    });
}

module.exports = {
    sendEmail: sendEmail
}