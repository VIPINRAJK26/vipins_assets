

import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Tools } from "../components/sections/Tools";
import { Works } from "../components/sections/Works";


function Index() {
    return (
        <>
            <main>
                <Hero />
                <About />
                <Works />
                <Tools />
                <Contact />
            </main>
        </>
    );
}

export default Index;
