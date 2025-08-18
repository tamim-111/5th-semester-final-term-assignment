import React from 'react';
import Heading from '../../Elements/Heading';

const LatestNews = () => {
    return (
        <section >
            <Heading title={"Latest Pharmacy & Health Updates"}></Heading>
            <div className="grid grid-cols-12 gap-y-6 md:gap-10 mt-20">

                {/* Left News Sidebar */}
                <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
                    <div className="flex flex-col space-y-8 md:space-y-12">
                        {[
                            {
                                title: 'New Online Prescription Guidelines for Pharmacies',
                                url: 'https://cpe.org.uk/our-news/gphc-publish-updated-guidance-for-online-pharmacy-services/',
                                time: 'August 1, 2025',
                            },
                            {
                                title: 'Top 5 Over-the-Counter Medicines for Common Cold',
                                url: 'https://www.verywellhealth.com/over-the-counter-cold-and-flu-medications-770618',
                                time: 'July 28, 2025',
                            },
                            {
                                title: 'How Digital Pharmacies Are Changing Medicine Delivery',
                                url: 'https://jhpn.biomedcentral.com/articles/10.1186/s41043-024-00550-2',
                                time: 'July 20, 2025',
                            },
                        ].map((news, i) => (
                            <div className="flex flex-col space-y-2" key={i}>
                                <h3 className="flex items-center space-x-2 ">
                                    <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full bg-[#25A8D6]"></span>
                                    <span className="text-xs font-bold tracking-wider uppercase">Update</span>
                                </h3>
                                <a href={news.url} target="_blank" rel="noopener noreferrer" className="font-serif hover:underline text-sm">
                                    {news.title}
                                </a>
                                <p className="text-xs ">
                                    {news.time} by <span className="hover:underline text-[#25A8D6]">MedEasy Team</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                        <div className="flex w-full h-1 bg-opacity-10 bg-[#25A8D6]">
                            <div className="w-1/2 h-full bg-[#25A8D6]"></div>
                        </div>
                        <a href="https://www.medicalnewstoday.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full text-[#25A8D6] text-xs font-bold tracking-wider uppercase">
                            See more updates
                            <svg viewBox="0 0 24 24" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 stroke-current">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Center Feature Article */}
                <div
                    className="relative flex col-span-12 bg-center bg-no-repeat bg-cover xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96 rounded-lg overflow-hidden"
                    style={{
                        backgroundImage: "url('https://shorturl.at/LpSDC')",

                    }}
                >
                    <span className="absolute px-2 py-1 text-xs font-bold uppercase border-b-2 left-6 top-6 text-white border-[#6BDCF6] bg-[#25A8D6]">
                        Featured Update
                    </span>
                    <a className="flex flex-col items-center justify-end w-full p-6 sm:p-8 bg-gradient-to-b from-transparent to-white" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11934860/" target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center mb-4 space-x-2 text-[#25A8D6]">
                            <span className="relative flex-shrink-0 w-2 h-2 rounded-full bg-[#25A8D6]">
                                <span className="absolute w-3 h-3 rounded-full -left-1 -top-1 animate-ping bg-[#6BDCF6]" />
                            </span>
                            <span className="text-sm font-bold">Live Update</span>
                        </span>
                        <h1 className="font-serif text-2xl font-semibold group-hover:underline text-gray-800">
                            Online Pharmacies Boost Medicine Accessibility for Remote Areas
                        </h1>
                    </a>
                </div>

                {/* Right Sidebar Popular News */}
                <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
                    <div className="mb-8 space-x-5 border-b-2 border-opacity-10 border-[#6BDCF6]">
                        <button type="button" className="pb-5 text-xs font-bold uppercase border-b-2 border-[#25A8D6] text-[#25A8D6]">Latest</button>
                        <button type="button" className="pb-5 text-xs font-bold uppercase ">Popular</button>
                    </div>
                    <div className="flex flex-col divide-y divide-[#e0e0e0]">
                        {[
                            {
                                title: 'New Pain Relief Medicine Approved by FDA',
                                category: 'Medicines',
                                time: '1 hour ago',
                                src: 'https://shorturl.at/Te7Bd',
                                url: 'https://www.yalemedicine.org/news/new-non-opioid-pain-pill',
                            },
                            {
                                title: 'Pharmacies Introduce Contactless Medicine Pickup',
                                category: 'Pharmacy Updates',
                                time: 'Yesterday',
                                src: 'https://www.pharmachoice.com/wp-content/uploads/2020/12/medication-pick-up.jpg',
                                url: 'https://www.researchgate.net/publication/346910544_Impact_of_a_contactless_prescription_pickup_kiosk_on_prescription_abandonment_patient_experience_and_pharmacist_consultations',
                            },
                            {
                                title: 'Boost Your Immunity with These Supplements',
                                category: 'Health Tips',
                                time: 'July 15, 2025',
                                src: 'https://shorturl.at/XEw0o',
                                url: 'https://health.clevelandclinic.org/vitamins-best-boosting-immunity',
                            },
                            {
                                title: 'Telepharmacy: How Online Consultation Helps Patients',
                                category: 'Digital Health',
                                time: 'July 10, 2025',
                                src: 'https://shorturl.at/AhieH',
                                url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5741040/',
                            },
                        ].map((item, idx) => (
                            <div className="flex px-1 py-4" key={idx}>
                                <img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 rounded" src={item.src} />
                                <div className="flex flex-col flex-grow">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-serif hover:underline text-sm">
                                        {item.title}
                                    </a>
                                    <p className="mt-auto text-xs ">
                                        {item.time} <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#25A8D6] hover:underline">{item.category}</a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
