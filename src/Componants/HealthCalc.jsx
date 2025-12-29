import React, { useState } from 'react';
import { calculateBMI, getBMICategory, a1cToGlucose, calculateEGFR } from '../utils/calculators';
import { formatCurrency, capitalizeWords } from '../utils/formatters';

const HealthCalc = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [a1c, setA1c] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');

  const bmi = weight && height ? calculateBMI(Number(weight), Number(height)) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : '';
  const glucose = a1c ? a1cToGlucose(Number(a1c)) : null;
  const egfr = creatinine && age ? calculateEGFR(Number(creatinine), Number(age), gender) : null;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Health Calculators</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>BMI</h3>
        <input
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Height (cm)"
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
        {bmi && (
          <p>
            BMI: <strong>{bmi}</strong> ({capitalizeWords(bmiCategory)})
          </p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>A1c → Glucose</h3>
        <input
          placeholder="A1c (%)"
          value={a1c}
          onChange={e => setA1c(e.target.value)}
        />
        {glucose && (
          <p>Estimated Glucose: <strong>{glucose} mg/dL</strong></p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>eGFR</h3>
        <input
          placeholder="Serum Creatinine (mg/dL)"
          value={creatinine}
          onChange={e => setCreatinine(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {egfr && (
          <p>eGFR: <strong>{egfr} mL/min/1.73m²</strong></p>
        )}
      </section>

      <section>
        <h3>Sample Pricing</h3>
        <p>Package price: {formatCurrency(1599)}</p>
      </section>
    </div>
  );
};

export default HealthCalc;
