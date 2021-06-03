import React,{Profiler} from 'react';
import Directory from '../../components/directory/directory.component';
import { HomePageConatiner, aboutUs } from "./homepage.styles";


const HomePage= ()=>(
    <HomePageConatiner>
        <Profiler id="Directory" onRender={(id, phase, actualDuration)=>{
            console.log({
                id,
                phase,
                actualDuration

            })
        }}>
            <Directory />
        </Profiler>
        <aboutUs>
        <h1>About us</h1>
        </aboutUs>
        <aboutUs>
         <p style={{fontSize: "larger"}}>We create clothing to inspire your story and remind you of who you are.</p>
         </aboutUs>
         <aboutUs>
        <p style={{fontSize: "larger"}}>More than just a brand, we want our clothing to shift your perspective to discover your true purpose.</p>
        </aboutUs>
    </HomePageConatiner>
);
export default HomePage;