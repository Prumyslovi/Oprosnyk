import '../Styles/formBuilder.css';

interface FormBuilderProps {
    isVisible: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ isVisible }) => {

    if (!isVisible) return null;

    return (
        <h1>Дарова</h1>
    );
} 

export default FormBuilder;