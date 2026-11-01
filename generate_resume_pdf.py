import os
import sys
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_resume(output_path=None):
    # Resolve output directory dynamically relative to project
    base_dir = Path(__file__).resolve().parent
    if output_path is None:
        target_dir = base_dir / "public" / "assets"
        target_dir.mkdir(parents=True, exist_ok=True)
        pdf_path = target_dir / "Sneha_Chavan_Resume.pdf"
    else:
        pdf_path = Path(output_path)
        pdf_path.parent.mkdir(parents=True, exist_ok=True)

    # 1-page compact yet comfortable margins
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=letter,
        leftMargin=34,
        rightMargin=34,
        topMargin=24,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()

    # Custom typography & styles adhering to standard Helvetica
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0f172a')
    )

    tagline_style = ParagraphStyle(
        'TaglineStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0d3b66')
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#334155')
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.5,
        textColor=colors.HexColor('#0d3b66'),
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.2,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#1e293b')
    )

    bold_body_style = ParagraphStyle(
        'BoldBodyText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.HexColor('#0f172a')
    )

    sub_bold_style = ParagraphStyle(
        'SubBoldStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.0,
        textColor=colors.HexColor('#475569')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        leftIndent=10,
        firstLineIndent=-6,
        textColor=colors.HexColor('#334155')
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#475569')
    )

    elements = []

    # 1. Header & Identity
    elements.append(Paragraph("SNEHA CHAVAN", name_style))
    elements.append(Spacer(1, 1.5))
    elements.append(Paragraph(
        'Full-Stack Developer &nbsp;&nbsp;|&nbsp;&nbsp; Backend Engineering &nbsp;&nbsp;|&nbsp;&nbsp; SaaS Builder',
        tagline_style
    ))
    elements.append(Spacer(1, 2))

    # Golden accent divider line
    elements.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#d97706'), spaceBefore=0, spaceAfter=2.5))

    # Clean contact information with valid clickable links (no emoji tofu)
    contact_line_1 = (
        '<a href="mailto:snehachavan0923@gmail.com"><font color="#0284c7"><u>snehachavan0923@gmail.com</u></font></a>'
        '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;'
        '+91 8884793633'
        '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;'
        'Bengaluru, Karnataka, India'
    )
    contact_line_2 = (
        'LinkedIn: <a href="https://www.linkedin.com/in/snehachavan29/"><font color="#0284c7"><u>linkedin.com/in/snehachavan29</u></font></a>'
        '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;'
        'GitHub: <a href="https://github.com/snehachavan0923"><font color="#0284c7"><u>github.com/snehachavan0923</u></font></a>'
    )
    elements.append(Paragraph(contact_line_1, contact_style))
    elements.append(Spacer(1, 1))
    elements.append(Paragraph(contact_line_2, contact_style))
    elements.append(Spacer(1, 3))

    def add_section_header(title):
        elements.append(Paragraph(f"<b>{title}</b>", heading_style))
        elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#0d3b66'), spaceBefore=1, spaceAfter=2.5))

    # 2. Professional Summary
    add_section_header("PROFESSIONAL SUMMARY")
    summary_text = (
        "Full-Stack Developer and Computer Science &amp; Engineering student at RV College of Engineering, with "
        "hands-on internship experience developing SaaS applications using React.js, Java Spring Boot, and MongoDB. "
        "Experienced in REST API development, JWT authentication, Role-Based Access Control, and third-party "
        "integrations including Cloudinary, and LocationIQ. Passionate about building secure backend systems, "
        "intuitive interfaces, and scalable software solutions."
    )
    elements.append(Paragraph(summary_text, body_style))
    elements.append(Spacer(1, 3))

    # 3. Work Experience
    add_section_header("WORK EXPERIENCE")
    exp_table = Table(
        [
            [
                Paragraph("<b>Full Stack Developer Intern</b> &nbsp;|&nbsp; <i>Fourise Software Solutions Pvt. Ltd., Pune</i>", bold_body_style),
                Paragraph("Dec 2025 – Apr 2026", date_style)
            ]
        ],
        colWidths=[420, 124]
    )
    exp_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(exp_table)

    exp_bullets = [
        "Completed a 4-month paid full-stack internship developing core modules for the PGMate SaaS platform using React.js and Spring Boot.",
        "Designed REST APIs and implemented secure JWT authentication with Role-Based Access Control (RBAC).",
        "Integrated Cloudinary for media uploads, LocationIQ for geolocation mapping.",
        "Designed MongoDB schemas, conducted API debugging and testing, and collaborated in Agile sprint cycles."
    ]
    for b in exp_bullets:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 1))
    elements.append(Spacer(1, 2.5))

    # 4. Featured Projects
    add_section_header("PROJECTS")

    # PGMate
    p1_table = Table([
        [
            Paragraph('<b>PGMate — Smart PG &amp; Hostel Management Platform</b> &nbsp; <font color="#16a34a"><b>[Done]</b></font>', bold_body_style),
            Paragraph("2025 – 2026", date_style)
        ],
        [
            Paragraph('React.js &nbsp;|&nbsp; Spring Boot &nbsp;|&nbsp; MongoDB &nbsp;|&nbsp; Cloudinary &nbsp;|&nbsp; LocationIQ &nbsp;&nbsp;·&nbsp;&nbsp; Live: <a href="https://pgmate.in/"><font color="#0284c7"><u>https://pgmate.in/</u></font></a>', sub_bold_style),
            Paragraph("", date_style)
        ]
    ], colWidths=[430, 114])
    p1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(p1_table)
    for b in [
        "Architected multi-role SaaS workflows for PG & hostel discovery, room and bed availability, and tenant management.",
        "Integrated LocationIQ geolocation mapping, Cloudinary media pipelines, admin moderation, and owner analytics."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 1))
    elements.append(Spacer(1, 1.8))

    # VolunteerLoop
    p2_table = Table([
        [
            Paragraph('<b>VolunteerLoop — Student Volunteering &amp; Event Management Platform</b> &nbsp; <font color="#16a34a"><b>[Done]</b></font>', bold_body_style),
            Paragraph("2026", date_style)
        ],
        [
            Paragraph('React.js &nbsp;|&nbsp; Vite &nbsp;|&nbsp; FastAPI &nbsp;|&nbsp; Python &nbsp;|&nbsp; MongoDB &nbsp;|&nbsp; REST APIs', sub_bold_style),
            Paragraph("", date_style)
        ],

    ], colWidths=[430, 114])
    p2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(p2_table)
    for b in [
        "Built a web-based platform connecting students with volunteering opportunities and enabling organizations to manage events, registrations, and volunteers.",
        "Developed backend APIs supporting event discovery, organization applications, event and duty management, and volunteer registrations.",
        "Designed workflows for attendance tracking, verified volunteer hours, notifications, and role-based access for students, organizers, and administrators."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 1))
    elements.append(Spacer(1, 1.8))

    # BugFlow
    p3_table = Table([
        [
            Paragraph('<b>BugFlow — Bug Tracking Platform</b> &nbsp; <font color="#ea580c"><b>[In Progress]</b></font>', bold_body_style),
            Paragraph("2026 – Present", date_style)
        ],
        [
            Paragraph('React.js &nbsp;|&nbsp; Spring Boot &nbsp;|&nbsp; MongoDB &nbsp;|&nbsp; JWT &nbsp;|&nbsp; Cloudinary', sub_bold_style),
            Paragraph("", date_style)
        ]
    ], colWidths=[430, 114])
    p3_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(p3_table)
    for b in [
        "Developing multi-tenant workspace management, issue tracking, and role-based access (Super Admin, Owner, Dev, Tester).",
        "Implemented JWT authentication, bug reporting, task assignment, and issue lifecycle (Workspace → Project → Issue)."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 1))
    elements.append(Spacer(1, 2.5))

    # 5. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills_data = [
        ("Programming Languages", "Java, Python"),
        ("Frontend", "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Axios, React Router"),
        ("Backend", "Java, Spring Boot, Spring MVC, Spring Security, RESTful APIs"),
        ("Database", "MongoDB, MySQL, Hibernate ORM, Spring Data JPA"),
        ("Authentication", "JWT, RBAC, OAuth 2.0 fundamentals"),
        ("Development Tools", "VS Code, Git, GitHub, Postman, Maven, Eclipse IDE"),
        ("Integrations", "Cloudinary, LocationIQ APIs")
    ]
    for category, details in skills_data:
        elements.append(Paragraph(f"<b>{category} :</b> &nbsp; {details}", body_style))
        elements.append(Spacer(1, 1))
    elements.append(Spacer(1, 2.5))

    # 6. Education
    add_section_header("EDUCATION")

    # 6.1 RVCE (Current Education - First and Most Prominent)
    edu_rvce = Table([
        [
            Paragraph("<b>RV College of Engineering (RVCE)</b>", bold_body_style),
            Paragraph("Sep 2026 – Present", date_style)
        ],
        [
            Paragraph("Bachelor of Engineering (B.E.) in Computer Science &amp; Engineering &nbsp;&nbsp;|&nbsp;&nbsp; <i>Bengaluru, Karnataka, India</i>", sub_bold_style),
            Paragraph("", date_style)
        ]
    ], colWidths=[420, 124])
    edu_rvce.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(edu_rvce)
    elements.append(Spacer(1, 1.2))

    # 6.2 Government Polytechnic, Kalaburagi
    edu_poly = Table([
        [
            Paragraph("<b>Government Polytechnic, Kalaburagi</b>", bold_body_style),
            Paragraph("Jun 2023 – Apr 2026", date_style)
        ],
        [
            Paragraph("Diploma in Computer Science &amp; Engineering &nbsp;·&nbsp; BTELINDIA &nbsp;&nbsp;|&nbsp;&nbsp; <b>CGPA: 9.97 / 10</b>", sub_bold_style),
            Paragraph("", date_style)
        ]
    ], colWidths=[420, 124])
    edu_poly.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(edu_poly)
    elements.append(Spacer(1, 1.2))

    # 6.3 Gayatri Girls High School, Gulbarga
    edu_school = Table([
        [
            Paragraph("<b>Gayatri Girls High School, Gulbarga</b>", bold_body_style),
            Paragraph("2022 – 2023", date_style)
        ],
        [
            Paragraph("Secondary School Leaving Certificate (SSLC) &nbsp;·&nbsp; KSEEB &nbsp;&nbsp;|&nbsp;&nbsp; Score: <b>88.64%</b>", sub_bold_style),
            Paragraph("", date_style)
        ]
    ], colWidths=[420, 124])
    edu_school.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    elements.append(edu_school)
    elements.append(Spacer(1, 2.5))

    # 7. Certifications
    add_section_header("CERTIFICATIONS")
    elements.append(Paragraph("• &nbsp; <b>HTML5, CSS3, JavaScript, Spring REST, React.js, and Python</b> &nbsp;—&nbsp; <i>Infosys</i>", body_style))
    elements.append(Spacer(1, 1))
    elements.append(Paragraph("• &nbsp; <b>Hardware, Networking &amp; Cybersecurity</b> &nbsp;—&nbsp; <i>KGTTI</i>", body_style))
    elements.append(Spacer(1, 1))
    elements.append(Paragraph("• &nbsp; <b>Endpoint Security</b> &nbsp;—&nbsp; <i>Cisco Networking Academy</i>", body_style))
    elements.append(Spacer(1, 1))
    elements.append(Paragraph("• &nbsp; <b>Field Technician Computing and Peripherals (ELE/Q4601)</b> &nbsp;—&nbsp; <i>ESSCI</i>", body_style))

    # Build the document
    doc.build(elements)
    print("PDF successfully generated at:", pdf_path)

    # Synchronize to public root
    public_root_pdf = base_dir / "public" / "Sneha_Chavan_Resume.pdf"
    try:
        import shutil
        shutil.copy2(str(pdf_path), str(public_root_pdf))
        print("Synchronized PDF copy to:", public_root_pdf)
    except Exception as e:
        print("Note: Could not copy to public root:", e)

    return str(pdf_path)


if __name__ == "__main__":
    out_arg = sys.argv[1] if len(sys.argv) > 1 else None
    generate_resume(out_arg)
