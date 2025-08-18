import React, { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Container from '../../components/container/Container'
import LoadingSpinner from '../../components/Spinner/LoadingSpinner'
import CustomTable from '../../components/CustomTable/CustomTable'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEye, FaCartPlus } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

const AllDiscountedProducts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addedToCartIds, setAddedToCartIds] = useState([])

    // Fetch discounted products
    const { data: discountProducts = [], isLoading } = useQuery({
        queryKey: ['allDiscountedProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/discounted')
            return res.data
        }
    })

    // Compute discount amount and discounted price
    const tableData = discountProducts.map(product => {
        const originalPrice = product.price
        const discountPercent = product.discount
        const discountAmount = Math.round((originalPrice * discountPercent) / 100)
        const discountedPrice = originalPrice - discountAmount

        return {
            ...product,
            originalPrice,
            discountPercent,
            discountAmount,
            discountedPrice,
        }
    })

    const openModal = (medicine) => {
        setSelectedMedicine(medicine)
        setIsModalOpen(true)
    }

    const handleAddToCart = async (medicine) => {
        if (!user) return toast.error('You must be logged in to add to cart')

        const cartItem = {
            ...medicine,
            medicineId: medicine._id,
            userEmail: user.email,
            quantity: 0,
            subtotal: 0,
        }
        delete cartItem._id

        try {
            const res = await axiosSecure.post('/carts', cartItem)
            if (res.data.insertedId) {
                toast.success(`${medicine.name} added to cart`)
                setAddedToCartIds(prev => [...prev, medicine._id])
            }
        } catch (err) {
            toast.error('Failed to add to cart')
        }
    }

    // Table columns including Actions
    const columns = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Generic', accessorKey: 'generic' },
        { header: 'Company', accessorKey: 'company' },
        { header: 'Original Price (৳)', accessorKey: 'originalPrice' },
        { header: 'Discount (%)', accessorKey: 'discountPercent' },
        { header: 'Discount Amount (৳)', accessorKey: 'discountAmount' },
        { header: 'Discounted Price (৳)', accessorKey: 'discountedPrice' },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <button
                        className='btn btn-sm btn-outline btn-info'
                        onClick={() => openModal(row.original)}
                    >
                        <FaEye />
                    </button>
                    <button
                        className='btn btn-sm btn-outline btn-info'
                        onClick={() => handleAddToCart(row.original)}
                        disabled={addedToCartIds.includes(row.original._id)}
                    >
                        <FaCartPlus />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <Container>
            <Helmet>
                <title>MedEasy | Discounted Products</title>
            </Helmet>
            <section className='my-16'>
                <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>
                    All Discounted Medicines
                </h2>

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={tableData}
                        showPriceSort={true}
                    />
                )}

                {/* Modal */}
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className='relative z-50'
                >
                    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto'>
                        <DialogPanel className='w-full max-w-xl rounded-xl bg-white p-4 sm:p-6 shadow-lg max-h-[90vh] overflow-y-auto'>
                            {selectedMedicine && (
                                <>
                                    <DialogTitle className='text-xl sm:text-2xl font-semibold text-[#25A8D6] mb-4'>
                                        {selectedMedicine.name}
                                    </DialogTitle>
                                    <img
                                        src={selectedMedicine.image}
                                        alt={selectedMedicine.name}
                                        className='w-full h-52 sm:h-60 object-fill rounded-md mb-4'
                                    />
                                    <p><strong>Generic:</strong> {selectedMedicine.generic}</p>
                                    <p><strong>Company:</strong> {selectedMedicine.company}</p>
                                    <p><strong>Original Price:</strong> ৳{selectedMedicine.originalPrice}</p>
                                    <p><strong>Discount (%):</strong> {selectedMedicine.discountPercent}%</p>
                                    <p><strong>Discount Amount:</strong> ৳{selectedMedicine.discountAmount}</p>
                                    <p><strong>Discounted Price:</strong> ৳{selectedMedicine.discountedPrice}</p>
                                    <p className='mt-2 text-gray-700'>{selectedMedicine.description}</p>
                                    <div className='text-right mt-6'>
                                        <button
                                            className='btn btn-sm bg-[#25A8D6] text-white hover:bg-[#1d95c3]'
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </>
                            )}
                        </DialogPanel>
                    </div>
                </Dialog>
            </section>
        </Container>
    )
}

export default AllDiscountedProducts
