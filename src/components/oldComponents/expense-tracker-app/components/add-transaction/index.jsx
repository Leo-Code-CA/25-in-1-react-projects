import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Input, RadioGroup, ModalFooter, Button, Radio } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function TransactionFrom({ onClose, isOpen }) {

    const { formData, setFormData, value, setValue, handleFormSubmit } = useContext(GlobalContext);

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleFormSubmit(formData);
    }


    // console.log(formData);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter Description</FormLabel>
                            <Input placeholder={'Enter Transaction Description'} name={'description'} type={'text'} onChange={handleFormChange}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Enter Amount</FormLabel>
                            <Input placeholder={'Enter Transaction Amount'} name={'amount'} type={'number'} onChange={handleFormChange}/>
                        </FormControl>
                        <RadioGroup mt={'5'} value={value} onChange={setValue}>
                            <Radio checked={formData.type === 'income'} value={'income'} colorScheme={'red'} name={'type'} onChange={handleFormChange}>Income</Radio>
                            <Radio checked={formData.type === 'expense'} value={'expense'} colorScheme={'blue'} name={'type'} onChange={handleFormChange}>Expense</Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={'4'} onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="submit">Add</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );

}