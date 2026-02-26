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
                    <div>
                        <input 
                            type="text" 
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange} 
                        />
                    </div>
                </fieldset>

            </form>

        </section>
    )
}

