import React, { useState } from 'react'

// Data required in form 
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

    // --- UPDATE VALUES IN FORM ---
    const handleChange = (e) => {

        // Get the value and the input name from event
        const { name, value } = e.target;

        // Update formData with the new value in the input targeted 
        setFormData(formData => ({
            ...formData, // previous data in form data
            [name] : value
        }));

    }

    return (

        <section
            className="flex flex-col gap-2 items-center justify-center max-w-2/3 mx-auto"
        >

            <h1
                className="text-lg"
            >
                Contact
            </h1>
            <form
                className="
                    text-sm bg-green-dark text-white p-4 rounded-lg border-green-light border-3 border-green-light"
            >
                <fieldset>
                    <div
                        className="flex flex-col gap-4 "
                    >

                        {/* Name field */}
                        <input 
                            type="text" 
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange} 
                            name="name"
                            className="bg-black-dark py-2 px-4 rounded-full"
                        />

                        {/* Mail field */}
                        <input 
                            type="text" 
                            placeholder="mail@mail.com"
                            value={formData.email}
                            onChange={handleChange} 
                            name="email"
                            className="bg-black-dark py-2 px-4 rounded-full"
                        />

                        {/* Message field */}
                        <textarea
                            placeholder="Votre message"
                            value={formData.message}
                            name="message"
                            className="bg-black-dark py-2 px-4 rounded-lg h-[150px]"
                        />

                        {/* Data management policy */}
                        <div
                            className="flex items-center justify-center gap-6"
                        >
                            <input 
                                type="checkbox"
                            />
                            <span>
                                J'accepte la politique de confidentialité.
                            </span>
                        </div>

                        <button
                            className="
                            text-sm bg-green-light py-2 px-10 rounded-full uppercase font-bold max-w-2/3 mx-auto"
                        >
                            Valider
                        </button>

                    </div>
                </fieldset>

            </form>

        </section>
    )
}

