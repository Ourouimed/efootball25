const SwitchBtn = ({ isOn, onToggle, size = "default" })=>{
    const sizeClasses = {
      default: {
        container: "h-6 w-11",
        circle: "h-4 w-4",
        translate: isOn ? "translate-x-6" : "translate-x-1"
      },
      large: {
        container: "h-8 w-14",
        circle: "h-6 w-6 shadow-lg",
        translate: isOn ? "translate-x-7" : "translate-x-1"
      }
    };
  
    const currentSize = sizeClasses[size];
  
    return (
      <button
        onClick={onToggle}
        className={`cursor-pointer relative inline-flex ${currentSize.container} items-center rounded-full transition-colors duration-200 ease-in-out outline-none  ${
          isOn ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block ${currentSize.circle} transform rounded-full bg-white transition-transform duration-200 ease-in-out ${currentSize.translate}`}
        />
      </button>
    );
  }



  export default SwitchBtn
  