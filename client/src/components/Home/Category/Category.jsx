import React from 'react'
import Container from '../../container/Container'
import CategoryCard from './CategoryCard'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Spinner/LoadingSpinner'
import Heading from '../../Elements/Heading'

const Category = () => {
    const axiosSecure = useAxiosSecure()

    // Get all categories
    const { data: categories = [], isLoading: loading1 } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories')
            return res.data
        },
    })

    // Get all medicines
    const { data: medicines = [], isLoading: loading2 } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines')
            return res.data
        },
    })

    if (loading1 || loading2) return <LoadingSpinner></LoadingSpinner>

    // Match and count medicines per category
    const categoryWithCounts = categories.map((cat) => {
        const count = medicines.filter((med) => med.category === cat.name).length
        return { ...cat, count }
    })

    return (
        <>
            <Heading title={"Explore Medicine Categories"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categoryWithCounts.map((cat) => (
                    <CategoryCard
                        key={cat._id}
                        id={cat.name}
                        name={cat.name}
                        image={cat.image}
                        count={cat.count}
                    />
                ))}
            </div>
        </>
    )
}

export default Category
