

import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Tools } from "../components/sections/Tools";
import { Works } from "../components/sections/Works";
import SEO from "../components/seo/SEO";

function Index() {
    return (
        <>
            <SEO 
                title="Vipin Raj - Software Developer"
                description="Portfolio of Vipin Raj, a software developer engineering scalable web apps, e-commerce, and CRM platforms."
                canonicalPath="/"
            />
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
