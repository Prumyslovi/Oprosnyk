import '../Styles/formBuilder.css';
import { useState } from 'react';

interface FormBuilderProps {
}

const FormBuilder: React.FC<FormBuilderProps> = () => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
  
    return (
      <div className='controls-row-style'>
        <button className='button-style'>Д</button>
        <button className='button-style'>Р</button>
        <button className='button-style'>Ф</button>
        <button className='button-style'>И</button>
        <button className='button-style'>П</button>
      </div>
    );
  };

export default FormBuilder;