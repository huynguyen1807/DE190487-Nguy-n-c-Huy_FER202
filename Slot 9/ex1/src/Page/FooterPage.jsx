import MyFooter from "../Components/Footer/MyFooter";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FooterPage() {
 return (
 <div className="footer">
<h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}></h2>
<MyFooter author="NguyenDucHuy" email = "huy484820@gmail.com" linkGithub="Movie Management Project" />
</div>
 );
}
