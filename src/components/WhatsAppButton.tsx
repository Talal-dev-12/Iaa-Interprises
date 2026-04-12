const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923012088090?text=Hello%2C%20I%20am%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-elevated transition-all duration-300 hover:scale-110 pl-0.5"
    >
      <img src="/whatsapp-icon.svg" alt="WhatsApp" className=" rounded-full" />
    </a>
  );
};

export default WhatsAppButton;