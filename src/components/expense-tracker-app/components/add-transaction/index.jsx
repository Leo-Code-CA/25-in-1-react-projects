import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Input, RadioGroup, ModalFooter, Button, Radio } from "@chakra-ui/react";

export default function TransactionFrom({ onClose, isOpen }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter Description</FormLabel>
                            <Input placeholder={'Enter Transaction Description'} name={'description'} type={'text'}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Enter Amount</FormLabel>
                            <Input placeholder={'Enter Transaction Amount'} name={'amount'} type={'number'}/>
                        </FormControl>
                        <RadioGroup mt={'5'}>
                            <Radio value={'expense'} colorScheme={'red'} name={'type'}>Expense</Radio>
                            <Radio value={'income'} colorScheme={'blue'} name={'type'}>Income</Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={'4'} onClick={onClose}>Cancel</Button>
                        <Button>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );

}