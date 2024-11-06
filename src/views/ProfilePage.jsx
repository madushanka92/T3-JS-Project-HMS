import React from 'react';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

const ProfilePage = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software Developer at XYZ Company',
        avatarUrl: 'https://via.placeholder.com/150'
    };

    return (
        <Container className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Image roundedCircle src={user.avatarUrl} alt={user.name} style={{ width: '100px', height: '100px' }} />
                        </Col>
                        <Col>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                            <Card.Text style={{ marginTop: '10px' }}>{user.bio}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
