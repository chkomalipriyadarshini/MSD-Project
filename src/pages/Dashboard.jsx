import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FileDropzone from '../components/FileDropzone.jsx'

function fakeAnalyze(file) {
  const id = 'r_' + Math.random().toString(36).slice(2, 9)
  const rand = (min, max) => Math.round((min + Math.random() * (max - min)) * 10) / 10
  return {
    id,
    filename: file.name,
    plagiarism: rand(0, 60),
    aiProbability: rand(0, 95),
    quality: rand(60, 100),
    uploadedAt: new Date().toISOString(),
    tips: [
      'Add citations for third-party ideas.',
      'Shorten long sentences for clarity.',
      'Use active voice.',
      'Check grammar and spelling carefully.'
    ].slice(0, 3)
  }
}

export default function Dashboard() {
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files) {
    setUploading(true)
    const results = await Promise.all(
      files.map(async (f) => {
        await new Promise((r) => setTimeout(r, 600))
        return fakeAnalyze(f)
      })
    )
    setItems((prev) => [...results, ...prev])
    setUploading(false)
  }

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="card">
        <h2>Upload Assignment</h2>
        <FileDropzone onFiles={handleFiles} />
      </div>

      <div className="card">
        <h3>Submissions</h3>
        {items.length === 0 ? (
          <p style={{ color: '#9ca3af' }}>No submissions yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>File</th>
                <th>Plagiarism</th>
                <th>AI Probability</th>
                <th>Quality</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td>{r.filename}</td>
                  <td>{r.plagiarism}%</td>
                  <td>{r.aiProbability}%</td>
                  <td>{r.quality}</td>
                  <td>
                    <Link className="btn secondary" to={`/results/${r.id}`} state={{ record: r }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
