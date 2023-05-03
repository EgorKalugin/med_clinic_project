import { useNavigate } from "react-router-dom";
import { entityToCreateForm, translateEntityForAddText } from "../../models/entities_mappings";
import "../../styles/CreateElement.css";

const CreateElement = (props) => {
    const entity = props.entity;
    const navigate = useNavigate();

    const renderButton = (entity) => {
        return <button className="element-page-button" onClick={() => {
            navigate("/" + entity);
        }
        }> ⏎ </button >;
    }

    return (
        <div className="workspace">
            <div id="section-title">
                <div id="section-title-text">
                    Добавить {translateEntityForAddText(entity).toLowerCase()}
                </div>
                {renderButton(entity)}
            </div>
            {entityToCreateForm[entity]}
        </div>
    );
};

export default CreateElement;