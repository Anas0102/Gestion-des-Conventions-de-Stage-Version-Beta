import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Home from "../Home";
import jsPDF from "jspdf";
import logo from '../../images/emsilogo.png';
import { FaBold } from "react-icons/fa";

function Convention() {
  const [conventions, setConventions] = useState([]);
  const imgRef = useRef(null);

  const handleTraitementUpdate = (id, nouveauTraitement) => {
    setConventions((prevConventions) =>
      prevConventions.map((convention) =>
        convention.id === id
          ? { ...convention, traitement: nouveauTraitement }
          : convention
      )
    );

    // Générer le PDF ici
    generatePDF(conventions.find((convention) => convention.id === id));
  };

  const conventionsCollectionRef = collection(db, "Convention");
  useEffect(() => {
    const getConventions = async () => {
      const data = await getDocs(conventionsCollectionRef);
      setConventions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getConventions();
  }, [conventionsCollectionRef]);

  const generatePDF = (Convention) => {
    const pdf = new jsPDF();

    // Load the image and generate the PDF after it's loaded
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      const pdfWidth = pdf.internal.pageSize.width;
      const imgWidth = 90; // Assuming the width of the image is 40 units

      // Calculate the x position to center the image
      const xPosition = (pdfWidth - imgWidth) / 2;
      // Add image to the PDF
      pdf.addImage(img, 'JPEG', xPosition, 10, imgWidth, 20);

      // Continue with the rest of the PDF generation
      pdf.setFontSize(28);
      pdf.text("Convention de Stage", 70, 70);
      pdf.setFontSize(14);
      pdf.text("Entre", 10, 80);
      pdf.text(" L'Ecole Marocaine des sciences de l'Ingénieur,", 10, 90);
      pdf.text("154, Rue EL BAKri-Casablanca-", 10, 100);
      pdf.text("Représentée par son Directeur Général", 10, 110);
      // Add other information to the PDF
      pdf.setFontSize(12);
     

      pdf.text(`Et Entreprise: ${Convention.entreprise}`, 10, 130);
      pdf.text("il a été convenu ce qui suit:", 10, 140);
      pdf.setFontSize(20);
      pdf.getStyle(FaBold);
      pdf.text(`${Convention.entreprise}`, 10, 150);
      pdf.setFontSize(14)
      pdf.text(`Adresse de l'entreprise: ${Convention.adresse}`, 10, 160);
      pdf.text("Accepte de recevoir, en qualité d'élève ingénieur-stagiaire", 10, 170);
      pdf.setFontSize(20);
      pdf.getStyle(FaBold);
      pdf.text(`Monsieur, ${Convention.nom} ${Convention.prenom}`, 10, 190);
      pdf.setFontSize(14);
      pdf.getStyle(FaBold);
      pdf.text("2-En ce qui concerne la durée du stage:", 10, 200);
      pdf.text(`Ce stage s'effectuera du ${Convention.date_debut} Au ${Convention.date_fin}`, 30, 210);
      pdf.getStyle(FaBold);
      pdf.text("3-En ce qui concerne la contenu du stage:", 10, 220);
      pdf.text(`__________________________________________________________________________________________________________
      ____________________________________________________________________________________________________________________
      ____________________________________________________________________________________________________________________`,
                30, 230);

      // Save the PDF
      pdf.save("convention_stage1.pdf");
      pdf.addPage();
      pdf.addImage(img, 'JPEG', xPosition, 10, imgWidth, 20);
      pdf.text("4-En ce qui concerne le status des élèves-stagiares:", 10, 50);
      pdf.text(`Les élèves restent étudiants à part entière et demeurent pendant toute cette période 
      sous la responsabilité de l'école qui pourra s'assurer du bon déroulement du stage 
      et s'informer directement auprès du responsable du stage.`,10,60)
      pdf.text("5- En ce qui concerne les obligations de l'élève :", 10, 80);
      pdf.text(`Durant le stage, les élèves sont soumis à la discipline générale de
       la structure d'accueil, notamment pour les problèmes d'horaires, 
       les obligations de travail, de discrétion et du respect du secret professionnel.`,10,90)
      pdf.text("6- En ce qui concerne l'assurance sociale des élèves :", 10, 110);
      pdf.text(`Au cours du stage les élèves stagiaires continueront de bénéficier 
      de l'assurance contractée par l'école.`,10,120)
      pdf.text("7- En ce qui concerne l'appréciation que le responsable du stage doit porter:", 10, 140);
      pdf.text(`Sur les élèves stagiaires, le responsable du stage doit apprécier 
      la qualité du travail des élèves, leurs disponibilités, leurs comportements 
      et leurs intérêts pour le stage.`,10,150)
      pdf.text("Fait à Casablanca, le 14/12/2023",100,260)
      pdf.text("Pour le responsable des Ressources Humaines",100,200)
      pdf.text("Pour l'étudiant",30,200)
      pdf.text("Pour IEMSI Le Directeur Général",55,230)
      pdf.save("convention_stage2.pdf");
    };
  };

  return (
    <div>
      <Home />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Demande de Conventions</h1>
      <table className="Convention table table-hover">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Entreprise</th>
            <th scope="col">Adresse de l'entreprise</th>
            <th scope="col">Date Debut</th>
            <th scope="col">Date Fin</th>
            <th scope="col"> Convention de Stage</th>
          </tr>
        </thead>
        <tbody>
          {conventions.map((convention) => (
            <tr key={convention.id}>
              <td>{convention.nom}</td>
              <td>{convention.prenom}</td>
              <td>{convention.entreprise}</td>
              <td>{convention.adresse}</td>
              <td>{convention.date_debut}</td>
              <td>{convention.date_fin}</td>
              <td>
                {convention.traitement}
                <button
                  className="btn btn-success p-1 space-button"
                  onClick={() => handleTraitementUpdate(convention.id)}
                >
                  Generer la convention
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Convention;
