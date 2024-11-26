import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Row, Col, Card, Spinner, Alert,
  Table, Badge
} from 'react-bootstrap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  DollarSign,
  Truck,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    lowStock: 0,
    pendingOrders: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Simulated API endpoint - replace with your actual endpoints
  const API_BASE_URL = 'https://api.yourdomain.com';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all required data in parallel
        const [metricsRes, stockRes, revenueRes, categoryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/metrics`),
          axios.get(`${API_BASE_URL}/stock-levels`),
          axios.get(`${API_BASE_URL}/revenue`),
          axios.get(`${API_BASE_URL}/categories`)
        ]);

        setMetrics(metricsRes.data);
        setStockData(stockRes.data);
        setRevenueData(revenueRes.data);
        setCategoryData(categoryRes.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // For the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <AlertCircle className="me-2" size={20} />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Inventory Dashboard</h1>
      
      {/* Metrics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Total Products</Card.Title>
                <Package size={20} className="text-muted" />
              </div>
              <h3>{metrics.totalProducts}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Low Stock Items</Card.Title>
                <AlertTriangle size={20} className="text-danger" />
              </div>
              <h3>{metrics.lowStock}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Pending Orders</Card.Title>
                <Truck size={20} className="text-muted" />
              </div>
              <h3>{metrics.pendingOrders}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Monthly Revenue</Card.Title>
                <DollarSign size={20} className="text-success" />
              </div>
              <h3>${metrics.monthlyRevenue.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Stock Levels by Product</Card.Title>
              <div className="mt-3">
                <BarChart width={500} height={300} data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#8884d8" />
                  <Bar dataKey="minStock" fill="#82ca9d" />
                </BarChart>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue Trend</Card.Title>
              <div className="mt-3">
                <LineChart width={500} height={300} data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Category Distribution</Card.Title>
              <div className="mt-3">
                <PieChart width={500} height={300}>
                  <Pie
                    data={categoryData}
                    cx={250}
                    cy={150}
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Low Stock Alerts</Card.Title>
              <div className="mt-3">
                {stockData
                  .filter(item => item.quantity <= item.minStock)
                  .map(item => (
                    <Alert key={item.id} variant="warning" className="mb-2">
                      <div className="d-flex align-items-center">
                        <AlertTriangle size={20} className="me-2" />
                        <span>
                          {item.name} is running low ({item.quantity} remaining)
                        </span>
                      </div>
                    </Alert>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions Table */}
      <Card>
        <Card.Body>
          <Card.Title>Recent Transactions</Card.Title>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1234</td>
                <td>Product A</td>
                <td>Purchase</td>
                <td>50</td>
                <td>2024-03-15</td>
                <td><Badge bg="success">Completed</Badge></td>
              </tr>
              <tr>
                <td>#1235</td>
                <td>Product B</td>
                <td>Sale</td>
                <td>25</td>
                <td>2024-03-14</td>
                <td><Badge bg="warning">Pending</Badge></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;