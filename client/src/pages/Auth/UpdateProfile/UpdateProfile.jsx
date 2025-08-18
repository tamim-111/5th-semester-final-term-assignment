import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner'
import { imageUpload } from '../../../api/utils'
import Button from '../../../components/Button/Button'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser, loading } = useAuth()
    const auth = getAuth()
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.displayName || '',
        },
    })

    const [previewImage, setPreviewImage] = useState(user?.photoURL || '')

    useEffect(() => {
        setPreviewImage(user?.photoURL || '')
    }, [user])

    if (loading) return <LoadingSpinner />

    const onSubmit = async (data) => {
        try {
            let imageUrl = previewImage

            if (data.image?.length > 0) {
                imageUrl = await imageUpload(data.image[0])
            }

            await updateUserProfile(data.name, imageUrl)
            await auth.currentUser.reload()
            setUser({ ...auth.currentUser })

            toast.success('Profile updated successfully!')
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Failed to update profile')
        }
    }

    return (
        <>
            <Helmet><title>MedEasy | UpdateProfile</title></Helmet>
            <div className="flex justify-center items-center min-h-screen ">
                <div className="flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900 relative">

                    <div className="flex justify-center -mt-16 mb-6">
                        <img
                            src={previewImage || "https://via.placeholder.com/150"}
                            alt="profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>

                    <h1 className="mb-6 text-3xl font-bold text-center">Update Profile</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200"
                                placeholder={user?.displayName || 'Your Name'}
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">
                                Profile Image (optional)
                            </label>
                            <input
                                type="file"
                                {...register('image')}
                                accept="image/*"
                                className="bg-gray-200 file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                    }
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            wideFull={true}
                            label={
                                loading ? (
                                    <span className="flex items-center justify-center">
                                        Updating...
                                    </span>
                                ) : (
                                    'Update'
                                )
                            }
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
