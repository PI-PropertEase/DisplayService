import { useQuery, useQueryClient } from 'react-query'
import { IModalDeleteData } from '../routes/PropertyDetails'
import { IoCloseOutline } from "react-icons/io5";
import { IFetchProperty } from '../types/PropertyType';
import { updateProperty } from '../services/Property.service';
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

export default function ModalDeletePropertyDetail() {
    const propertyId = useParams<{id: string}>().id;

    const authHeader = useAuthHeader() ?? "";

    const {data: modalDeleteData} = useQuery<IModalDeleteData>('modalDeleteData')

    const queryClient = useQueryClient();

    const handleModalClose = () => {
        const updatedModalDeleteData = { 
            ...modalDeleteData, 
            isOpen: false, 
            id: modalDeleteData?.id ?? '',
            prop_id: modalDeleteData?.prop_id ?? '',
        };
        queryClient.setQueryData<IModalDeleteData>('modalDeleteData', updatedModalDeleteData);
    };

    const handleDelete = async () => {
        const updatedPropertyDetails: IFetchProperty = queryClient.getQueryData(`property${modalDeleteData?.prop_id}`)!;
        const id = modalDeleteData?.id.substring(modalDeleteData?.id.split(' ')[0].length).trim();
        
        if (id){
            if (modalDeleteData?.id.includes('Bedroom')) {
                delete updatedPropertyDetails.bedrooms[id];
            } else if (modalDeleteData?.id.includes('Bathroom')) {
                delete updatedPropertyDetails.bathrooms[id];
            } else if (modalDeleteData?.id.includes('Contact') && modalDeleteData.index !== undefined) {
                updatedPropertyDetails.contacts.splice(modalDeleteData.index, 1);
            }
        }
        await queryClient.invalidateQueries(`property${modalDeleteData?.prop_id}`)
        queryClient.setQueryData(`property${modalDeleteData?.prop_id}`, updatedPropertyDetails);
        await updateProperty(propertyId ?? "", updatedPropertyDetails, authHeader);
        handleModalClose();
        return;
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
                    <button className="btn btn-primary" onClick={() => { void handleDelete(); }}>Yes</button>
                        <button className="btn btn-secondary" onClick={handleModalClose}>No</button>
                    </div>
                </div>
            </dialog>
            </>
        )}
        
        </>
    )
}
