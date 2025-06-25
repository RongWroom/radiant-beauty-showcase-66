
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ContactFaq = () => {
  const faqs = [
    {
      question: "How do I book an appointment at STW Aesthetic Clinic?",
      answer: "You can book an appointment by filling out our contact form above, calling us at 01207 239983, or emailing sharon@stwaestheticclinic.co.uk. We offer free consultations to discuss your skincare goals and recommend the best treatments for you."
    },
    {
      question: "What should I expect during my first consultation?",
      answer: "During your initial consultation, our expert practitioners will assess your skin, discuss your concerns and goals, explain suitable treatment options, and provide a personalized treatment plan. Consultations typically last 30-45 minutes and are completely free of charge."
    },
    {
      question: "How far in advance should I book my treatment?",
      answer: "We recommend booking 1-2 weeks in advance for most treatments. Popular treatments like Ultra 4D HIFU and laser hair removal may require longer lead times. Emergency appointments can sometimes be accommodated based on availability."
    },
    {
      question: "Do you offer payment plans for treatments?",
      answer: "Yes, we offer flexible payment options including installment plans for larger treatment packages. We accept cash, card payments, and can discuss financing options during your consultation to make treatments more accessible."
    },
    {
      question: "What areas do you serve from your Stanley location?",
      answer: "From our clinic at 110 Front Street, Stanley, we serve clients throughout County Durham, Newcastle, Gateshead, and surrounding areas in the North East. Free parking is available nearby for your convenience."
    },
    {
      question: "Can I combine multiple treatments in one visit?",
      answer: "Many of our treatments can be safely combined for enhanced results. During your consultation, we'll create a treatment plan that may include complementary procedures. Some combinations may require separate appointments for optimal safety and results."
    },
    {
      question: "What aftercare support do you provide?",
      answer: "We provide comprehensive aftercare instructions for all treatments, including our range of professional skincare products. Our team is always available for post-treatment questions, and we schedule follow-up appointments as needed to monitor your progress."
    },
    {
      question: "Do you offer treatments for men as well as women?",
      answer: "Absolutely! We welcome clients of all genders. Many of our treatments, including laser hair removal, anti-aging procedures, and skin rejuvenation treatments, are popular with both men and women seeking professional aesthetic care."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <span className="block h-0.5 sm:h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
          </div>
          <p className="text-lg sm:text-xl text-brand-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our treatments, booking process, and clinic policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-brand-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-brand-charcoal py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-brand-gray-600 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-brand-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <p className="text-brand-charcoal font-semibold">
            Call us at <a href="tel:01207239983" className="text-brand-slate-blue hover:underline">01207 239983</a> or 
            email <a href="mailto:sharon@stwaestheticclinic.co.uk" className="text-brand-slate-blue hover:underline">sharon@stwaestheticclinic.co.uk</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFaq;
