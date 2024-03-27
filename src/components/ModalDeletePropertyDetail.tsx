import { useQuery, useQueryClient } from 'react-query'
import { IModalDeleteData } from '../routes/PropertyDetails'
import { IPropertyDetails } from '../main'
import { IoCloseOutline } from "react-icons/io5";

export default function ModalDeletePropertyDetail() {

    const {data: modalDeleteData} = useQuery<IModalDeleteData>('modalDeleteData')

    const queryClient = useQueryClient();

    const handleModalClose = () => {
        const updatedModalDeleteData = { 
            ...modalDeleteData, 
            isOpen: false, 
            id: modalDeleteData?.id ?? '',
        };
        queryClient.setQueryData<IModalDeleteData>('modalDeleteData', updatedModalDeleteData);
    };

    const handleDelete = () => {
        const updatedPropertyDetails: IPropertyDetails = queryClient.getQueryData('propertyDetails')!;
        const id = modalDeleteData?.id.substring(modalDeleteData?.id.split(' ')[0].length).trim();
    
        if (id){
            if (modalDeleteData?.id.includes('Bedroom')) {
                delete updatedPropertyDetails.bedrooms[id];
            } else if (modalDeleteData?.id.includes('Bathroom')) {
                updatedPropertyDetails.bathrooms.delete(id);
            } else if (modalDeleteData?.id.includes('Contact')) {
                // Encontrar o índice do contato a ser removido
                const indexToRemove = updatedPropertyDetails.contact.findIndex(contact => contact.id === parseInt(id));
                if (indexToRemove !== -1) {
                    updatedPropertyDetails.contact.splice(indexToRemove, 1);
                }
            }
        }
        queryClient.setQueryData('propertyDetails', updatedPropertyDetails);
        handleModalClose();
    }
    



    return (
        <>
        {modalDeleteData && modalDeleteData.isOpen && (
            <>
            <div className="fixed inset-0 bg-smoke z-50"></div>
            <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
                <div className="modal-box">
                    <div className='flex flex-row items-center justify-between'>
                        <h3 className=" font-medium text-2xl text-center py-2">Delete {modalDeleteData.id} </h3>
                        <IoCloseOutline className='text-2xl cursor-pointer' onClick={handleModalClose}/>
                    </div>
                    <hr/>
                    <div className='felx flex-wrap mt-4'>
                        <p>Are you sure you want to delete the {modalDeleteData.id }?</p>
                    </div>
                    <div className="modal-action flex flex-row items-center justify-center gap-2">
                        <button className="btn btn-primary" onClick={handleDelete}>Yes</button>
                        <button className="btn btn-secondary" onClick={handleModalClose}>No</button>
                    </div>
                </div>
            </dialog>
            </>
        )}
        
        </>
    )
}
