import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../globalFetch/api";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';

const Event = () => {
  const [events, setEvents] = useState([]); // State to store events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/admin/get-events");
        if (response.status === 200) {
          setEvents(response.data.data); // Set the fetched events to state
          console.log(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="d-flex p-4">
      <PageTitle title="Event" />
        
      <Row>
        <Col xs={12}>
        <div style={{ width: "70vw", background: "white", border: "1px solid gray", padding:10 ,borderRadius:10}}>
            <Row className="d-flex justify-content-between align-items-center p-2">
              <Col xs="auto">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search" 
                  style={{ width: "250px", borderRadius: 10 }} 
                />
              </Col>
              <Col xs="auto">
                <Button 
                  type="button" 
                  variant="dark" 
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  as={Link} 
                  to="/event/new" // Link to the event creation page
                >
                  New Event
                </Button>
              </Col>
            </Row>

            <div>
              <div className="responsive-table-plugin">
                <div className="table-rep-plugin">
                  <div className="table-responsive" data-pattern="priority-columns">
                    <table 
                      id="tech-companies-1" 
                      className="table table-striped" 
                      style={{ width: "100%", textAlign: "center" }} // Stretch table and center text
                    >
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Title</th>
                          
                          <th style={{ textAlign: "center" }}>Event Date</th>
                          <th style={{ textAlign: "center" }}>Place</th>
                          <th style={{ textAlign: "center" }}>Timing</th>
                          <th style={{ textAlign: "center" }}>Image</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event, idx) => (
                          <tr key={idx}>
                            <td style={{ verticalAlign: "middle" }}>{event.title}</td>
                        
                            <td style={{ verticalAlign: "middle" }}>{new Date(event.eventDate).toLocaleDateString()}</td>
                            <td style={{ verticalAlign: "middle" }}>{event.place}</td>
                            <td style={{ verticalAlign: "middle" }}>{event.timing}</td>
                            <td style={{ verticalAlign: "middle" }}>
                              {event.image ? (
                                <img 
                                  src={event.image} 
                                  alt="Event Banner" 
                                  style={{ width: "50px", height: "auto", display: "block", margin: "0 auto",borderRadius:20 }} // Center image
                                />
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>{event.isFinished ? "Finished" : "Ongoing"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Event;