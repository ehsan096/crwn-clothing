import React,{Profiler} from 'react';
import './contactus.styles.scss';


const ContactUs= ()=>(
   <div className="ContactContainer">
       <h1 >CONTACT US</h1>
       <hr />
        <p>Feel free to send in any questions or concerns that you have about our products. We will get back to you in 24 hours or less!</p>
        <div className="one">
            <input type="text" id="name" name="name"  placeholder="Name"/>
            <input type="email" id="email" name="email"  placeholder="Email"/>
        </div>
        
        <input type="text" id="phone" name="phone"  placeholder="Phone Number"/>
        <textarea id="w3review" name="w3review" rows="20" cols="50" placeholder="Message"/>
       
        <button> SEND</button>
       

   </div>
);
export default ContactUs;