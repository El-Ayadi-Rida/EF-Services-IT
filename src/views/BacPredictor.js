import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import React ,{ useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';

function BacPredictor() {
    const [noteNationale, setNoteNationale] = useState(0);
    const [noteFINAL, setNoteFINAL] = useState(0);
    const [noteSelection, setNoteSelection] = useState(0);
    const [isResult, setIsResult] = useState(false);
    const [noteNationaleRequired, setNoteNationaleRequired] = useState(0);



    const bacTypeOptions = [
        { value: 'SVT', label: 'Sciences de la vie et de la Terre' },
        { value: 'PC', label: 'Physique et Chimie' },
        ];
  const [bacTypeValue, setBacTypeValue] = useState('');
  const validationSchema = Yup.object().shape({
    bacType: Yup.string().required('Bac Type is required'),
    noteMath: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de mathématiques obligatoire'),
    notePc: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Physique et Chimie obligatoire'),
    noteSVT: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Sciences de la Vie et de la Terre obligatoire'),
    notePh: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Philosophie obligatoire'),
    noteAng: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Anglais obligatoire'),
    noteReg: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Regional obligatoire'),
    noteCc: Yup.number()
      .min(1, 'Note must be at least 1')
      .max(20, 'Note cannot exceed 20')
      .required('Note de Controle Continu obligatoire'),
  });

  const initialValues = {
    bacType: '',
    noteMath: 0.0,
    notePc: 0.0,
    noteSVT: 0.0,
    notePh: 0.0,
    noteAng: 0.0,
    noteReg: 0.0,
    noteCc: 0.0,
  };

  const onSubmit = (values) => {
    let noteN;
    if (values) {

    if (values.bacType === 'PC') {
        noteN = (values.noteMath * 7 + values.notePc * 7 + values.noteSVT * 5 + values.notePh * 2 + values.noteAng * 2) / 23;
    } else if (values.bacType === 'SVT') {
        noteN = (values.noteMath * 7 + values.notePc * 5 + values.noteSVT * 7 + values.notePh * 2 + values.noteAng * 2) / 23;
    }

    // Calculate noteFINAL and noteSelection
    const noteF = noteN * 0.5 + values.noteReg * 0.25 + values.noteCc * 0.25;
    const noteS = noteN * 0.75 + values.noteReg * 0.25;

    setNoteNationale(noteN); setNoteFINAL(noteF); setNoteSelection(noteS);

    if (noteF < 10) {
        setNoteNationaleRequired((10 - (values.noteReg * 0.25 + values.noteCc * 0.25)) / 0.5);
    }

    console.log('Submitted values:', values);
    setIsResult(true);      
    }
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue ,setValues , values, touched, errors } = formik;

  const bacTypeOnChange = (selectedOption) => {
    setFieldValue('bacType', selectedOption.value);
    setBacTypeValue(selectedOption);
  };

  const title = 'Prédisez vos notes de baccalauréat';
  const description =
    'Grâce à notre outil, évaluez vos performances scolaires et obtenez une estimation de vos futures notes de baccalauréat.';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <NavLink to="/" className="muted-link pb-1 d-inline-block">
                <CsLineIcons icon="chevron-left" size="13" />{' '}
                <span className="text-small align-middle">Accueil</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
            </div>
            <Card className="mb-5" body>
              <Card.Text>{description}</Card.Text>
            </Card>
          </section>
          {/* Title End */}
        </Col>
      </Row>

      {/* Form Start */}
      {
        !isResult && (

      <Row>
        <section className="scroll-section" id="formikBasic">
          <h2 className="small-title">Nationale & Controle Continu & Regional</h2>
          <Card body className="mb-5">
            <form onSubmit={handleSubmit}>
              <Row className="mb-3 g-3">
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Bac Type</Form.Label>
                    <Select classNamePrefix="react-select" name="noteMath" options={bacTypeOptions} value={bacTypeValue} onChange={bacTypeOnChange} placeholder="Bac Type" />
                    {errors.bacType && touched.bacType && (
                      <div className="d-block invalid-tooltip">{errors.bacType}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Mathématiques </Form.Label>
                    <Form.Control
                      type="number"
                      name="noteMath"
                      value={values.noteMath}
                      onChange={handleChange}
                    />
                    {errors.noteMath && touched.noteMath && (
                      <div className="d-block invalid-tooltip">{errors.noteMath}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Physique et Chimie</Form.Label>
                    <Form.Control
                      type="number"
                      name="notePc"
                      value={values.notePc}
                      onChange={handleChange}
                    />
                    {errors.notePc && touched.notePc && (
                      <div className="d-block invalid-tooltip">{errors.notePc}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Sciences de la Vie et de la Terre</Form.Label>
                    <Form.Control
                      type="number"
                      name="noteSVT"
                      value={values.noteSVT}
                      onChange={handleChange}
                    />
                    {errors.noteSVT && touched.noteSVT && (
                      <div className="d-block invalid-tooltip">{errors.noteSVT}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Anglais</Form.Label>
                    <Form.Control
                      type="number"
                      name="noteAng"
                      value={values.noteAng}
                      onChange={handleChange}
                    />
                    {errors.noteAng && touched.noteAng && (
                      <div className="d-block invalid-tooltip">{errors.noteAng}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Philosophie</Form.Label>
                    <Form.Control
                      type="number"
                      name="notePh"
                      value={values.notePh}
                      onChange={handleChange}
                    />
                    {errors.notePh && touched.notePh && (
                      <div className="d-block invalid-tooltip">{errors.notePh}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Regional</Form.Label>
                    <Form.Control
                      type="number"
                      name="noteReg"
                      value={values.noteReg}
                      onChange={handleChange}
                    />
                    {errors.noteReg && touched.noteReg && (
                      <div className="d-block invalid-tooltip">{errors.noteReg}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group position-relative tooltip-end-top">
                    <Form.Label>Note de Controle Continu</Form.Label>
                    <Form.Control
                      type="number"
                      name="noteCc"
                      value={values.noteCc}
                      onChange={handleChange}
                    />
                    {errors.noteCc && touched.noteCc && (
                      <div className="d-block invalid-tooltip">{errors.noteCc}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">Submit</Button>
            </form>
          </Card>
        </section>
      </Row>
        )
    }
      {
        isResult && (
            <Row>
            <section className="scroll-section" id="formikBasic">
              <h2 className="small-title">Resultat</h2>
              <Card body className="mb-5">
                {
                    noteFINAL >= 10 ? 
                    (
                    <Alert variant="success">
                        <Alert.Heading>Félicitations pour ton succès au baccalauréat !</Alert.Heading>
                        <p>
                        Bravo !  Ton travail acharné et ta persévérance ont porté leurs fruits : tu as réussi ton baccalauréat ! C'est une étape importante dans ton parcours, et tu peux être fier/fière de toi.
                        <br/>
                        Profite de ce moment de victoire et savoure cette réussite pleinement. Je te souhaite beaucoup de succès pour la suite de tes projets et de nouvelles aventures qui t'attendent !
                        <br/>
                        Encore toutes mes félicitations,
                        </p>
                        <hr />
                        <p className="mb-0">
                        Félicitations pour votre réussite au baccalauréat ! Votre note nationale est {noteNationale}, votre note finale de baccalauréat est {noteFINAL}, et votre note de sélection est {noteSelection}. Vous avez brillamment réussi, bravo !</p>
                    </Alert>
                    ):
                    (
                    <Alert variant="danger">
                        <Alert.Heading>Rattrapage – Une seconde chance pour briller !</Alert.Heading>
                        <p>
                        Ce n'est pas encore terminé ! Tu as l'opportunité de passer le rattrapage et de montrer tout ce dont tu es capable. C'est ta chance de prouver ta détermination et de réussir cette épreuve.
                        <br/>
                        Prends le temps de bien te préparer, reste concentré(e), et n'oublie pas que tu peux y arriver. Garde confiance en toi, tu es plus proche du but que tu ne le penses.
                        <br/>
                        Je crois en toi, et je suis sûr(e) que tu vas briller !
                        </p>
                        <hr />
                        <p className="mb-0">Rattrapage requis ! Votre note finale de baccalauréat est {noteFINAL}, ce qui est inférieur à 10. Vous devez améliorer votre note nationale à au moins {noteNationaleRequired} pour réussir l'examen. Préparez-vous bien, vous avez encore une chance de réussir ! </p>
                    </Alert>
                    )
                }
                <Button type="button"
                    onClick={() => {
                        console.log("Essayer une autre prédiction");
                        setValues(initialValues);
                        setIsResult(false);
                    }}
                >
                    Essayer une autre prédiction
                </Button>
              </Card>
            </section>
          </Row>    
        )
      }

      {/* Form End */}
    </>
  );
}

export default BacPredictor;
