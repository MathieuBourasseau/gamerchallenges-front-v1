import React, { useState } from 'react'

type ContactData = {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {

    // Form data secured with ContactData type
    // Form data is empty by default 
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        email: '',
        message: '',
    });

    return (

        <section>

            <h1>Contact</h1>
            <form
                className="bg-green-dark"
            >
                <fieldset>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium autem veniam asperiores neque ipsum cumque, in ducimus id earum veritatis eos hic quod deleniti, maiores odio voluptatum, sequi minima temporibus.
                </fieldset>

            </form>

        </section>
    )
}

