"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useContactModalStore } from "@/lib/zustand/contactModalStore";

export interface ContactFormRef {
  submit: () => void;
}

const serviceOptions = [
  "UGC",
  "Brand Photography",
  "Short-Form Video",
  "Content Strategy",
  "Identity",
  "Account Management",
  "Other",
];

const budgetOptions = ["Under $500", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k+"];

const ContactForm = forwardRef<ContactFormRef>((_, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    company: false,
    message: false,
    services: false,
    budget: false,
  });
  const toggleModal = useContactModalStore((state) => state.toggleModal);

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
  }));

  // Handle service selection (multiselect)
  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((item) => item !== service));
    } else {
      setServices([...services, service]);
    }
    setErrors({ ...errors, services: false });
  };

  // Handle budget selection (single select)
  const selectBudget = (option: string) => {
    setBudget(option);
    setErrors({ ...errors, budget: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset all errors
    const newErrors = {
      name: false,
      email: false,
      company: false,
      message: false,
      services: false,
      budget: false,
    };

    // Validate each field
    if (clientData.name.trim() === "") {
      newErrors.name = true;
    }
    if (clientData.email.trim() === "") {
      newErrors.email = true;
    }
    if (clientData.company.trim() === "") {
      newErrors.company = true;
    }
    if (clientData.message.trim() === "") {
      newErrors.message = true;
    }
    if (services.length === 0) {
      newErrors.services = true;
    }
    if (budget === "") {
      newErrors.budget = true;
    }

    setErrors(newErrors);

    // If there are any errors, don't submit
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Add your form submission logic here
    console.log("Form submitted: ");
    console.log(clientData);
    console.log(services);
    console.log(budget);

    // Reset form
    setClientData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setServices([]);
    setBudget("");
    setErrors({
      name: false,
      email: false,
      company: false,
      message: false,
      services: false,
      budget: false,
    });
    toggleModal();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-[clamp(36px,5vw,120px)] font-semibold tracking-tight mb-[clamp(24px,2.5vw,36px)] leading-[0.8]">
        <span className="text-purple-600">Get in</span>{" "}
        <span className="text-purple-800">touch</span>
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 h-full"
      >
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* Full name */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.name ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="name"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={(e) => {
                setClientData({ ...clientData, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              placeholder="Fiona Wong"
              className="text-purple-600 font-semibold placeholder:text-purple-600/40 text-[clamp(16px,1.2vw,24px)] focus:outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.email ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="email"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={clientData.email}
              onChange={(e) => {
                setClientData({ ...clientData, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              placeholder="fionawong@gmail.com"
              className="text-purple-600 font-semibold placeholder:text-purple-600/40 text-[clamp(16px,1.2vw,24px)] focus:outline-none bg-transparent"
            />
          </div>

          {/* Company */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 2xl:h-44 rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.company ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="company"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)]"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              value={clientData.company}
              onChange={(e) => {
                setClientData({ ...clientData, company: e.target.value });
                setErrors({ ...errors, company: false });
              }}
              placeholder="Fifi Vintage"
              className="text-purple-600 font-semibold placeholder:text-purple-600/40 text-[clamp(16px,1.2vw,24px)] focus:outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full h-full">
          {/* Message */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-4 h-72 lg:h-full rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.message ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="message"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)] mb-2"
            >
              Project details
            </label>
            <textarea
              name="message"
              value={clientData.message}
              onChange={(e) => {
                setClientData({ ...clientData, message: e.target.value });
                setErrors({ ...errors, message: false });
              }}
              placeholder="Tell me your goals"
              className="text-purple-600 font-semibold placeholder:text-purple-600/40 text-[clamp(16px,1.2vw,24px)] leading-tight focus:outline-none h-full resize-none bg-transparent"
            ></textarea>
          </div>

          {/* Services */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-6 lg:h-full rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.services ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="services"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)] mb-2 lg:mb-4 2xl:mb-6"
            >
              What can I do for you?
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {serviceOptions.map((service) => (
                <li
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3.5 2xl:px-5 py-1.5 2xl:py-2 text-[clamp(14px,1vw,20px)] font-semibold rounded-full border-2 border-purple-600 cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      services.includes(service)
                        ? "text-purple-100 bg-purple-600"
                        : "text-purple-600"
                    }`}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Budget */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-6 h-96 lg:h-full rounded-xl lg:rounded-2xl bg-purple-50 border-3 transition-all duration-300 focus-within:border-purple-600 focus-within:shadow-lg focus-within:shadow-purple-200
              ${errors.budget ? "border-red-500" : "border-transparent"}
              `}
          >
            <label
              htmlFor="budget"
              className="text-purple-600 font-semibold text-[clamp(16px,1.2vw,24px)] mb-2 lg:mb-4 2xl:mb-6"
            >
              Do you have a budget range?
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {budgetOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => selectBudget(option)}
                  className={`px-3.5 2xl:px-5 py-1.5 2xl:py-2 text-[clamp(14px,1vw,20px)] font-semibold rounded-full border-2 border-purple-600 cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      budget === option
                        ? "text-purple-100 bg-purple-600"
                        : "text-purple-600"
                    }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm; 