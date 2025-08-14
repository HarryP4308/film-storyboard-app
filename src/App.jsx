import React, { useState } from "react";
import { supabase } from './supabaseClient';
function App() {
  const [page, setPage] = useState("dashboard");
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
    setPage("dashboard");
  };

  return (
    <div style={styles.app}>
      {page === "dashboard" && (
        <Dashboard records={records} onAddClick={() => setPage("add")} />
      )}
      {page === "add" && (
        <AddFilmShotForm onSave={addRecord} onCancel={() => setPage("dashboard")} />
      )}
    </div>
  );
}

function Dashboard({ records, onAddClick }) {
  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎬 Film Shots Dashboard</h1>
        <button onClick={onAddClick} style={styles.primaryButton}>
          ➕ Add New Film Shot
        </button>
      </div>

      {records.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No film shots yet.</p>
          <p style={styles.emptySubtext}>Click "Add New Film Shot" to get started!</p>
        </div>
      ) : (
        <div style={styles.recordsList}>
          {records.map((rec, index) => (
            <div key={index} style={styles.recordCard}>
              <div style={styles.recordHeader}>
                <span style={styles.sceneNumber}>Scene {rec.scene}</span>
                <span style={styles.shotInfo}>Shot {rec.shot}</span>
              </div>
              <div style={styles.recordDetails}>
                <span style={styles.shotSize}>{rec.shotSize}</span>
                <span style={styles.angleType}>{rec.shotType.angleType}</span>
                <span style={styles.subject}>{rec.subject}</span>
              </div>
              <p style={styles.description}>{rec.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddFilmShotForm({ onSave, onCancel }) {
  const [scene, setScene] = useState("");
  const [storyboard, setStoryboard] = useState(null);
  const [shot, setShot] = useState("");
  const [description, setDescription] = useState("");
  const [shotSize, setShotSize] = useState("close up");

  const [angleType, setAngleType] = useState("eye level");
  const [framing, setFraming] = useState("single");
  const [focus, setFocus] = useState("rack focus");
  const [dutchAngle, setDutchAngle] = useState("dutch left");

  const [subject, setSubject] = useState("");
  const [movement, setMovement] = useState("static");
  const [equipment, setEquipment] = useState("stick");
  const [lighting, setLighting] = useState("");
  const [sound, setSound] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();

  const { error } = await supabase
    .from('film_shots')
    .insert([
      {
        scene,
        storyboard_url: storyboardFileUrl, // You can upload to Supabase Storage
        shot,
        description,
        shot_size,
        angle_type,
        framing,
        focus,
        dutch_angle,
        subject,
        movement,
        equipment,
        lighting,
        sound
      }
    ]);

  if (error) {
    console.error(error);
  } else {
    alert('Shot saved!');
  }
}

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeader}>
        <h2 style={styles.formTitle}>➕ Add New Film Shot</h2>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Basic Information</h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Scene* (Number)</label>
            <input 
              type="number" 
              value={scene} 
              onChange={(e) => setScene(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Storyboard (File Upload)</label>
            <input 
              type="file" 
              onChange={(e) => setStoryboard(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Shot* (Decimal)</label>
            <input 
              type="number" 
              step="0.1" 
              value={shot} 
              onChange={(e) => setShot(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description*</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              rows="3"
              required
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Shot Specifications</h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Shot Size</label>
            <select value={shotSize} onChange={(e) => setShotSize(e.target.value)} style={styles.select}>
              <option>close up</option>
              <option>medium shot</option>
              <option>wide shot</option>
              <option>long shot</option>
              <option>extreme close up</option>
              <option>medium close up</option>
              <option>full shot (cowboy)</option>
              <option>medium wide shot</option>
              <option>extreme long shot</option>
              <option>establishing</option>
              <option>master</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject</label>
            <input 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              style={styles.input}
              placeholder="Who or what is the focus?"
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Camera Angles & Framing</h3>
          
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Angle Type</label>
              <select value={angleType} onChange={(e) => setAngleType(e.target.value)} style={styles.select}>
                <option>eye level</option>
                <option>low angle</option>
                <option>high angle</option>
                <option>overhead</option>
                <option>shoulder level</option>
                <option>hip level</option>
                <option>knee level</option>
                <option>ground level</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Framing</label>
              <select value={framing} onChange={(e) => setFraming(e.target.value)} style={styles.select}>
                <option>single</option>
                <option>two shot</option>
                <option>three shot</option>
                <option>four shot</option>
                <option>group shot</option>
                <option>over-the-shoulder</option>
                <option>over-the-hip</option>
                <option>point of view</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Focus</label>
              <select value={focus} onChange={(e) => setFocus(e.target.value)} style={styles.select}>
                <option>rack focus</option>
                <option>shallow focus</option>
                <option>deep focus</option>
                <option>tilt shift</option>
                <option>zoom</option>
                <option>crash zoom</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Dutch Angle</label>
              <select value={dutchAngle} onChange={(e) => setDutchAngle(e.target.value)} style={styles.select}>
                <option>dutch left</option>
                <option>dutch right</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Movement & Equipment</h3>
          
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Movement</label>
              <select value={movement} onChange={(e) => setMovement(e.target.value)} style={styles.select}>
                <option>static</option>
                <option>pan</option>
                <option>tracking shot</option>
                <option>boom</option>
                <option>slide</option>
                <option>tilt</option>
                <option>camera roll</option>
                <option>pushing</option>
                <option>pull out</option>
                <option>dolly zoom-in</option>
                <option>dolly zoom-out</option>
                <option>shake</option>
                <option>arc</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Equipment</label>
              <select value={equipment} onChange={(e) => setEquipment(e.target.value)} style={styles.select}>
                <option>stick</option>
                <option>drone</option>
                <option>crane</option>
                <option>dolly</option>
                <option>steadicam</option>
                <option>hand held</option>
                <option>gimbal</option>
                <option>vehicle mount</option>
                <option>overhead rig</option>
                <option>pedestal</option>
                <option>stabilizer</option>
                <option>motion control</option>
                <option>underwater housing</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Technical Details</h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Lighting</label>
            <input 
              value={lighting} 
              onChange={(e) => setLighting(e.target.value)} 
              style={styles.input}
              placeholder="e.g. natural light, softbox, backlight"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Sound</label>
            <input 
              value={sound} 
              onChange={(e) => setSound(e.target.value)} 
              style={styles.input}
              placeholder="e.g. boom mic, lav mic, on-camera mic"
            />
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.primaryButton}>
            💾 Save Film Shot
          </button>
          <button type="button" onClick={onCancel} style={styles.secondaryButton}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#F5F0F5", // Light pearly purple background
    padding: "20px"
  },
  dashboard: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(139, 21, 56, 0.1)", // Dark raspberry shadow
    border: "1px solid #E6E6FA" // Pearly purple border
  },
  title: {
    margin: 0,
    color: "#8B1538", // Dark raspberry
    fontSize: "2.5rem",
    fontWeight: "700"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(139, 21, 56, 0.1)",
    border: "1px solid #E6E6FA"
  },
  emptyText: {
    fontSize: "1.2rem",
    color: "#8B1538", // Dark raspberry
    margin: "0 0 10px 0"
  },
  emptySubtext: {
    color: "#D2B4DE", // Classic rose
    margin: 0
  },
  recordsList: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))"
  },
  recordCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(139, 21, 56, 0.1)",
    border: "1px solid #E6E6FA",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  recordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  sceneNumber: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "white",
    backgroundColor: "#8B1538", // Dark raspberry
    padding: "4px 12px",
    borderRadius: "20px"
  },
  shotInfo: {
    fontSize: "0.9rem",
    color: "#D2B4DE", // Classic rose
    fontWeight: "500"
  },
  recordDetails: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap"
  },
  shotSize: {
    backgroundColor: "#E6E6FA", // Pearly purple
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    color: "#8B1538", // Dark raspberry
    border: "1px solid #D2B4DE"
  },
  angleType: {
    backgroundColor: "#F8E8F0", // Light classic rose
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    color: "#8B1538", // Dark raspberry
    border: "1px solid #D2B4DE"
  },
  subject: {
    backgroundColor: "#F0E6FA", // Very light pearly purple
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    color: "#8B1538", // Dark raspberry
    border: "1px solid #E6E6FA"
  },
  description: {
    margin: 0,
    color: "#5D4E75", // Muted purple-gray
    lineHeight: "1.5",
    fontSize: "0.95rem"
  },
  formContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(139, 21, 56, 0.15)",
    overflow: "hidden",
    border: "1px solid #E6E6FA"
  },
  formHeader: {
    backgroundColor: "#8B1538", // Dark raspberry
    padding: "24px",
    color: "white"
  },
  formTitle: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "600"
  },
  form: {
    padding: "32px"
  },
  section: {
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #E6E6FA" // Pearly purple
  },
  sectionTitle: {
    color: "#8B1538", // Dark raspberry
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "20px",
    margin: "0 0 20px 0"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#5D4E75", // Muted purple-gray
    fontSize: "0.95rem"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #E6E6FA", // Pearly purple
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    outline: "none"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #E6E6FA",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    outline: "none"
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #E6E6FA",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "white",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    outline: "none"
  },
  fileInput: {
    width: "100%",
    padding: "8px",
    border: "2px dashed #D2B4DE", // Classic rose
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#F8E8F0", // Light classic rose
    boxSizing: "border-box"
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
    paddingTop: "24px",
    borderTop: "1px solid #E6E6FA",
    marginTop: "32px"
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#8B1538", // Dark raspberry
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.1s ease",
    outline: "none"
  },
  secondaryButton: {
    padding: "12px 24px",
    backgroundColor: "#D2B4DE", // Classic rose
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.1s ease",
    outline: "none"
  }
};

// Add hover effects via CSS-in-JS simulation
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    button:hover {
      transform: translateY(-1px);
    }
    input:focus, textarea:focus, select:focus {
      border-color: #8B1538 !important;
      box-shadow: 0 0 0 3px rgba(139, 21, 56, 0.1) !important;
    }
    .record-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(139, 21, 56, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
};

// Call this when component mounts
if (typeof document !== 'undefined') {
  addHoverEffects();
}

export default App;