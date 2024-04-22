import React, { useEffect, useState } from 'react';
import axios from 'axios';
import stats1 from '../assets/stats1.png';
import CategoryBarChart from '../Components/CategoryChart';

const AdminPage = () => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);
    const [listingCount, setListingCount] = useState(0);
    const [categoryCounts, setCategoryCounts] = useState([]);
    const [averageListingPrice, setAverageListingPrice] = useState(0);


useEffect(() => {
    const fetchStats = async () => {
      
      try{
          const userRes = await axios.get('https://localhost:8080/user/stats/users');
          setUserCount(userRes.data.userCount);

          const listingRes = await axios.get('https://localhost:8080/user/stats/listings');
          setListingCount(listingRes.data.listingCount);

          // const averagePriceRes = await axios.get('https://localhost:8080/user/stats/listings/average-price');
          // setAverageListingPrice(averagePriceRes.data.averagePrice);

          const categoryRes = await axios.get('https://localhost:8080/user/stats/listings/category');
          setCategoryCounts(categoryRes.data);

          // const categoryRes = await axios.get('https://localhost:8080/user/stats/listings/category');
          // setCategoryCounts(categoryRes.data.categoryCounts);
       
      }catch(error) {
        
          console.error("Failed to fetch stats:", error);
         
        }
         
    };

    fetchStats();
   
  }, []);
  

  // Now you can use userCount, listingCount, and categoryCounts to display your statistics


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Statistics</h2>
                  <table>
                <thead>
                    <tr>
                        <th>Statistic</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Users:</td>
                        <td>{userCount}</td>
                    </tr>
                    <tr>
                        <td>Total Listings:</td>
                        <td>{listingCount}</td>
                    </tr>
                    {categoryCounts.map((category) => (
                      <tr key={category._id}>
                        <td>Category - {category._id}:</td>
                        <td>{category.count}</td>
                      </tr>
                    ))}
            {/* Iterate over categoryCounts to display each category and its count */}
            {/* {categoryCounts.map((category) => (
              <tr key={category._id}>
                <td>Category - {category._id}:</td>
                <td>{category.count}</td>
              </tr>
            ))} */}
                </tbody>
            </table>
            {/* <div style={{ width: '600px', height: '400px' }}>
      <CategoryBarChart categoryCounts={categoryCounts} />
    </div> */}
             {/* If you imported the image */}
             <img src={stats1} alt="VT Marketplace Customer Feedback Statistics" className='stats-icon' />
    </div>
  );
};

export default AdminPage;
