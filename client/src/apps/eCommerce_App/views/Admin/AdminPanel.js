import React, { useState } from 'react';
import { Container, Tabs, Tab, Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { PlusCircle, Edit, Trash, User, Clock, Globe, CreditCard } from 'lucide-react';

const AdminPanel = () => {
  // Extended state management
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.99, stock: 50, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 599.99, stock: 75, category: 'Electronics' },
    // Should include name, summary, description, reviews, availability, price, category
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      lastLogin: '2024-03-20 14:30:00',
      ipHistory: [
        { ip: '192.168.1.1', timestamp: '2024-03-20 14:30:00' },
        { ip: '192.168.1.2', timestamp: '2024-03-19 10:15:00' }
      ],
      totalOrders: 5,
      totalSpent: 2499.95
      // Should include past orders list, (order details, shipping details, etc.)
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      lastLogin: '2024-03-19 16:45:00',
      ipHistory: [
        { ip: '192.168.2.1', timestamp: '2024-03-19 16:45:00' }
      ],
      totalOrders: 3,
      totalSpent: 1599.97
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TRX001',
      orderId: 'ORD001',
      customerId: 1,
      amount: 1599.98,
      status: 'Completed',
      timestamp: '2024-03-20 14:35:00',
      paymentMethod: 'Credit Card',
      lastFour: '4242'
    },
    {
      id: 'TRX002',
      orderId: 'ORD002',
      customerId: 2,
      amount: 999.99,
      status: 'Processing',
      timestamp: '2024-03-19 16:50:00',
      paymentMethod: 'PayPal',
      lastFour: null
    }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'John Doe', total: 1599.98, status: 'Shipped' },
    { id: 'ORD002', customer: 'Jane Smith', total: 999.99, status: 'Processing' },
  ]);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: ''
  });

  // Product management functions
  const handleAddProduct = () => {
    if (currentProduct.id) {
      handleEditedProduct(currentProduct);
    } else {
      const newProduct = {
        ...currentProduct,
        id: products.length + 1
      };
      setProducts([...products, newProduct]);
      // Axios post request to add the product
      // THEN set the new product to the products state
    }
    setShowProductModal(false);
  };

  const handleEditedProduct = (product) => {
    const updatedProducts = products.map(p => p.id === product.id ? product : p);
    setProducts(updatedProducts);
    setShowProductModal(false);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Customer detail view
  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  // Transaction detail view
  const handleViewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    const statusColors = {
      'Completed': 'success',
      'Processing': 'primary',
      'On Hold': 'warning',
      'Failed': 'danger',
      'Refunded': 'secondary'
    };
    return statusColors[status] || 'primary';
  };

  // Transaction status update handler
  const handleUpdateStatus = async (transactionId, newStatus) => {
    try {
      // API call would go here
      console.log(`Updating transaction ${transactionId} to ${newStatus}`);
      // Update local state after successful API call
      setTransactions(prevTransactions =>
        prevTransactions.map(t =>
          t.id === transactionId
            ? { ...t, status: newStatus }
            : t
        )
      );
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  // Export transaction details handler
  const handleExportTransaction = (transaction) => {
    const exportData = {
      ...transaction,
      customerName: customers.find(c => c.id === transaction.customerId)?.name,
      exportDate: new Date().toISOString()
    };
    
    // In a real implementation, you might want to:
    // 1. Generate a PDF or CSV
    // 2. Use a proper export library
    // 3. Handle the download process
    console.log('Exporting transaction:', exportData);
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">E-Commerce Admin Panel</h1>
      
      <Tabs defaultActiveKey="products" className="mb-3">
        {/* Products Tab */}
        <Tab eventKey="products" title="Products">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h4>Products</h4>
                <Button 
                  variant="success" 
                  onClick={() => {
                    setCurrentProduct({ name: '', price: 0, stock: 0, category: '' });
                    setShowProductModal(true);
                  }}
                >
                  <PlusCircle className="mr-2" /> Add Product
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                      <td>
                        <Button 
                          variant="warning" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Customers Tab */}
        <Tab eventKey="customers" title="Customers">
          <Card>
            <Card.Header>
              <h4>Customer Management</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last Login</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.lastLogin}</td>
                      <td>{customer.totalOrders}</td>
                      <td>${customer.totalSpent.toFixed(2)}</td>
                      <td>
                        <Button 
                          variant="info" 
                          size="sm"
                          onClick={() => handleViewCustomerDetails(customer)}
                        >
                          <User size={16} className="me-1" /> View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Transactions Tab */}
        <Tab eventKey="transactions" title="Transactions">
          <Card>
            <Card.Header>
              <h4>Transaction History</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.orderId}</td>
                      <td>{customers.find(c => c.id === transaction.customerId)?.name}</td>
                      <td>${transaction.amount.toFixed(2)}</td>
                      <td>{transaction.status}</td>
                      <td>{transaction.timestamp}</td>
                      <td>{transaction.paymentMethod}</td>
                      <td>
                        <Button 
                          variant="info" 
                          size="sm"
                          onClick={() => handleViewTransactionDetails(transaction)}
                        >
                          <CreditCard size={16} className="me-1" /> View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Orders Tab */}
        <Tab eventKey="orders" title="Orders">
          <Card>
            <Card.Header>
              <h4>Orders</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>{order.status}</td>
                      <td>
                        <Button variant="info" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Product Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct.id ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" 
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  name: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="number" 
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  price: parseFloat(e.target.value)
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
                type="number" 
                value={currentProduct.stock}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  stock: parseInt(e.target.value)
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type="text" 
                value={currentProduct.category}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  category: e.target.value
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Customer Details Modal */}
      <Modal 
        show={showCustomerModal} 
        onHide={() => setShowCustomerModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <>
              <h5>Basic Information</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>{selectedCustomer.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>{selectedCustomer.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Orders</strong></td>
                    <td>{selectedCustomer.totalOrders}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Spent</strong></td>
                    <td>${selectedCustomer.totalSpent.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>

              <h5 className="mt-4">IP History</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer.ipHistory.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.ip}</td>
                      <td>{entry.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Transaction Details Modal */}
      <Modal 
        show={showTransactionModal} 
        onHide={() => setShowTransactionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>Transaction ID</strong></td>
                    <td>{selectedTransaction.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Order ID</strong></td>
                    <td>{selectedTransaction.orderId}</td>
                  </tr>
                  <tr>
                    <td><strong>Customer</strong></td>
                    <td>{customers.find(c => c.id === selectedTransaction.customerId)?.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Amount</strong></td>
                    <td>${selectedTransaction.amount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>Status</strong></td>
                    <td>
                      <span className={`badge bg-${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Payment Method</strong></td>
                    <td>
                      {selectedTransaction.paymentMethod}
                      {selectedTransaction.lastFour && ` (**** **** **** ${selectedTransaction.lastFour})`}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Timestamp</strong></td>
                    <td>{selectedTransaction.timestamp}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Transaction Timeline */}
              <h6 className="mt-4 mb-3">Transaction Timeline</h6>
              <div className="transaction-timeline">
                {selectedTransaction.timeline?.map((event, index) => (
                  <div key={index} className="timeline-item d-flex mb-3">
                    <div className="timeline-icon me-3">
                      <Clock size={16} />
                    </div>
                    <div className="timeline-content">
                      <div className="fw-bold">{event.status}</div>
                      <div className="text-muted small">{event.timestamp}</div>
                      {event.notes && <div className="timeline-notes mt-1">{event.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Related Order Details */}
              <h6 className="mt-4 mb-3">Order Items</h6>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTransaction.orderItems?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total</strong></td>
                    <td><strong>${selectedTransaction.amount.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => handleExportTransaction(selectedTransaction)}
          >
            Export Details
          </Button>
          {selectedTransaction?.status === 'Processing' && (
            <Button 
              variant="warning" 
              size="sm"
              onClick={() => handleUpdateStatus(selectedTransaction.id, 'On Hold')}
            >
              Put on Hold
            </Button>
          )}
          {selectedTransaction?.status === 'Processing' && (
            <Button 
              variant="success" 
              size="sm"
              onClick={() => handleUpdateStatus(selectedTransaction.id, 'Completed')}
            >
              Mark as Completed
            </Button>
          )}
          <Button variant="primary" onClick={() => setShowTransactionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;