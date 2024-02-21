import {Button, Dropdown, DropdownHeader} from "react-bootstrap";
import {centeredDivStyle, buttonStyle, dropdownToggleStyle, dropdownMenuStyle} from "./styles"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';



function SelectionScreen() {
    const generalDropdownValues = ["Questions Based On Job Posting", "General Questions (Soft Skills)"];
    const technicalDropdownValues = ["Data Structures & Algorithms", "Web Development", "Data Science & Machine Learning"];
    const navigateLinks = ["/general", "job-specific", "technical"];


    const [selectedItem, setSelectedItem] = useState(generalDropdownValues[0]);
    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };

    const navigate = useNavigate();

    function readDropdown() {
        console.log(selectedItem);

        if (selectedItem === generalDropdownValues[0]) {
            navigate('/tailored-questions');
        } else if (selectedItem === generalDropdownValues[1]) {
            navigate('/general-questions')
        } else {
            navigate('/technical-questions')
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <div style={{ color: 'black', fontSize: '40px', marginTop: '10%' }}>
                    Get realistic interview practice tailored to the job
                </div>
                <div style={{ color: 'gray', fontWeight: 1, fontSize: '24px' }}>
                    Select what skillset you want to practice
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Dropdown onSelect={handleSelect} align="end">
                    <Dropdown.Toggle style={dropdownToggleStyle} variant="success" id="dropdown-basic">
                        {selectedItem}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={dropdownMenuStyle}>
                        <DropdownHeader>General Questions</DropdownHeader>
                        {generalDropdownValues.map((value, index) => (
                            <Dropdown.Item key={index} eventKey={value}>{value}</Dropdown.Item>
                        ))}
                        <DropdownHeader>Technical Questions</DropdownHeader>
                        {technicalDropdownValues.map((value, index) => (
                            <Dropdown.Item key={index} eventKey={value}>{value}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Button style={buttonStyle} onClick={readDropdown}>Start</Button>
            </div>

        </div>

    )
}

export default SelectionScreen;
