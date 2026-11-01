#!/usr/bin/env python3
import os
import sys
from pathlib import Path

# ── Ensure Python 3.10+ and Site-Packages for ReportLab & FontAwesome ──
if sys.version_info < (3, 10):
    for candidate_py in [
        "/usr/local/bin/python3",
        "/Library/Frameworks/Python.framework/Versions/3.13/bin/python3",
    ]:
        if os.path.exists(candidate_py):
            os.execv(candidate_py, [candidate_py] + sys.argv)

# Add Python 3.13 framework site-packages if needed
py313_site = "/Library/Frameworks/Python.framework/Versions/3.13/lib/python3.13/site-packages"
if os.path.exists(py313_site) and py313_site not in sys.path:
    sys.path.insert(0, py313_site)

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Color Palette Constants ──
LINK_BLUE = '#1a5fb4'
DONE_GREEN = '#16a34a'
WIP_ORANGE = '#ea580c'
RULE_GREY = '#c0c0c0'
BODY_BLACK = '#1a1a1a'
DATE_GREY = '#444444'

# ── Font Awesome Registration ──
_FA_REGISTERED = False


def _ensure_fa_fonts():
    """Register Font Awesome Solid and Brands TTF fonts once."""
    global _FA_REGISTERED
    if _FA_REGISTERED:
        return True
    try:
        import fontawesomefree
        fa_base = Path(fontawesomefree.__path__[0])
        wf = fa_base / 'static' / 'fontawesomefree' / 'webfonts'
        solid = wf / 'fa-solid-900.ttf'
        brands = wf / 'fa-brands-400.ttf'
        if solid.exists() and brands.exists():
            pdfmetrics.registerFont(TTFont('FA-Solid', str(solid)))
            pdfmetrics.registerFont(TTFont('FA-Brands', str(brands)))
            _FA_REGISTERED = True
            return True
    except Exception as exc:
        print(f"Warning: could not register Font Awesome fonts ({exc})")
    return False


def _icon(font_name, codepoint_hex, size=7.5):
    """Return XML font tag for a Font Awesome glyph in pure black."""
    char = chr(int(codepoint_hex, 16))
    return f'<font name="{font_name}" size="{size}" color="#000000">{char}</font>'


def _ico_solid(cp, sz=7.5):
    return _icon('FA-Solid', cp, sz)


def _ico_brand(cp, sz=7.5):
    return _icon('FA-Brands', cp, sz)


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

    has_fa = _ensure_fa_fonts()

    # A4 dimensions: 595.27 x 841.89 pt
    # Balanced margins: left/right = 38 pt (~0.53 in), top/bottom = 26 pt (~0.36 in)
    page_w, page_h = A4
    lr_margin = 38
    tb_margin = 26
    content_w = page_w - (2 * lr_margin)

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=lr_margin,
        rightMargin=lr_margin,
        topMargin=tb_margin,
        bottomMargin=tb_margin
    )

    styles = getSampleStyleSheet()

    # ── Typography Styles (Times Serif) ──
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=21,
        leading=25,
        alignment=TA_CENTER,
        textColor=colors.HexColor(BODY_BLACK)
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=colors.HexColor(BODY_BLACK)
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10,
        leading=12.5,
        textColor=colors.HexColor(BODY_BLACK),
        spaceBefore=0,
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11,
        alignment=TA_LEFT,
        textColor=colors.HexColor(BODY_BLACK)
    )

    bold_body_style = ParagraphStyle(
        'BoldBodyText',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.8,
        leading=11,
        textColor=colors.HexColor(BODY_BLACK)
    )

    italic_style = ParagraphStyle(
        'ItalicStyle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.5,
        leading=10.5,
        textColor=colors.HexColor(DATE_GREY)
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=10.5,
        leftIndent=11,
        firstLineIndent=-7,
        textColor=colors.HexColor(BODY_BLACK)
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.5,
        leading=11,
        alignment=TA_RIGHT,
        textColor=colors.HexColor(DATE_GREY)
    )

    # Reusable table styling for title/date rows
    TABLE_STYLE = TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0.5),
    ])

    col_left = content_w - 110
    col_right = 110

    elements = []

    def section_header(title):
        elements.append(Spacer(1, 4))
        elements.append(Paragraph(f"<b>{title}</b>", heading_style))
        elements.append(HRFlowable(
            width="100%", thickness=0.5,
            color=colors.HexColor(RULE_GREY),
            spaceBefore=1.5, spaceAfter=3.5
        ))

    def entry_row(left_html, right_html):
        t = Table(
            [[Paragraph(left_html, bold_body_style),
              Paragraph(right_html, date_style)]],
            colWidths=[col_left, col_right],
        )
        t.setStyle(TABLE_STYLE)
        elements.append(t)

    def link_label(url):
        return (
            f' &mdash; <a href="{url}">'
            f'<font color="{LINK_BLUE}"><u>Link</u></font></a>'
        )

    # ════════════════════════════════════════════
    #  1. HEADER & CONTACT ROW
    # ════════════════════════════════════════════
    elements.append(Paragraph("Sneha Chavan", name_style))
    elements.append(Spacer(1, 3.5))

    if has_fa:
        phone_i = _ico_solid('f095', 7.5)   # phone
        globe_i = _ico_solid('f0ac', 7.5)   # globe
        mail_i = _ico_solid('f0e0', 7.5)    # envelope
        li_i = _ico_brand('f08c', 7.5)      # linkedin
        gh_i = _ico_brand('f09b', 7.5)      # github
    else:
        phone_i = globe_i = mail_i = li_i = gh_i = ''

    contact_parts = [
        f'{phone_i}&nbsp;<a href="tel:9353339382"><font color="{LINK_BLUE}">9353339382</font></a>',
        f'{globe_i}&nbsp;<a href="https://snehachavan-portfolio.vercel.app/"><font color="{LINK_BLUE}">Portfolio</font></a>',
        f'{mail_i}&nbsp;<a href="mailto:snehachavan0923@gmail.com"><font color="{LINK_BLUE}">Email</font></a>',
        f'{li_i}&nbsp;<a href="https://www.linkedin.com/in/snehachavan29/"><font color="{LINK_BLUE}">LinkedIn</font></a>',
        f'{gh_i}&nbsp;<a href="https://github.com/snehachavan0923/"><font color="{LINK_BLUE}">GitHub</font></a>',
    ]
    sep = ' &nbsp;&mdash;&nbsp; '
    elements.append(Paragraph(sep.join(contact_parts), contact_style))
    elements.append(Spacer(1, 2))

    # Thin header separator rule
    elements.append(HRFlowable(
        width="100%", thickness=0.5,
        color=colors.HexColor(RULE_GREY),
        spaceBefore=2, spaceAfter=3.5
    ))

    # ════════════════════════════════════════════
    #  2. PROFESSIONAL SUMMARY
    # ════════════════════════════════════════════
    section_header("PROFESSIONAL SUMMARY")
    summary_text = (
        "Full-Stack Developer and Computer Science &amp; Engineering student at RV College of Engineering, with "
        "hands-on internship experience developing SaaS applications using React.js, Java Spring Boot, and MongoDB. "
        "Experienced in REST API development, JWT authentication, Role-Based Access Control, and third-party "
        "integrations including Cloudinary and LocationIQ. Passionate about building secure backend systems, "
        "intuitive interfaces, and scalable software solutions."
    )
    elements.append(Paragraph(summary_text, body_style))
    elements.append(Spacer(1, 2))

    # ════════════════════════════════════════════
    #  3. WORK EXPERIENCE
    # ════════════════════════════════════════════
    section_header("WORK EXPERIENCE")
    entry_row(
        "<b>Full Stack Developer Intern</b> &nbsp;|&nbsp; <i>Fourise Software Solutions Pvt. Ltd., Pune</i>",
        "Dec 2025 – Apr 2026"
    )
    exp_bullets = [
        "Completed a 4-month paid full-stack internship developing core modules for the PGMate SaaS platform using React.js and Spring Boot.",
        "Designed REST APIs and implemented secure JWT authentication with Role-Based Access Control (RBAC).",
        "Integrated Cloudinary for media uploads, LocationIQ for geolocation mapping.",
        "Designed MongoDB schemas, conducted API debugging and testing, and collaborated in Agile sprint cycles."
    ]
    for b in exp_bullets:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 0.8))
    elements.append(Spacer(1, 1.5))

    # ════════════════════════════════════════════
    #  4. PROJECTS (With short blue inline Link)
    # ════════════════════════════════════════════
    section_header("PROJECTS")

    # 4.1 PGMate
    entry_row(
        f'<b>PGMate &mdash; Smart PG &amp; Hostel Management Platform</b>'
        f'{link_label("https://pgmate.in/")}'
        f' &nbsp;<font color="{DONE_GREEN}"><b>[Done]</b></font>',
        "2025 – 2026"
    )
    elements.append(Paragraph("<i>React.js | Spring Boot | MongoDB | Cloudinary | LocationIQ</i>", italic_style))
    for b in [
        "Architected multi-role SaaS workflows for PG &amp; hostel discovery, room and bed availability, and tenant management.",
        "Integrated LocationIQ geolocation mapping, Cloudinary media pipelines, admin moderation, and owner analytics."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 0.8))
    elements.append(Spacer(1, 1.5))

    # 4.2 VolunteerLoop
    entry_row(
        f'<b>VolunteerLoop &mdash; Student Volunteering &amp; Event Management Platform</b>'
        f'{link_label("https://github.com/snehachavan0923/Volunteer-Loop")}'
        f' &nbsp;<font color="{DONE_GREEN}"><b>[Done]</b></font>',
        "2026"
    )
    elements.append(Paragraph("<i>React.js | Vite | FastAPI | Python | MongoDB | REST APIs</i>", italic_style))
    for b in [
        "Built a web-based platform connecting students with volunteering opportunities and enabling organizations to manage events, registrations, and volunteers.",
        "Developed backend APIs supporting event discovery, organization applications, event and duty management, and volunteer registrations.",
        "Designed workflows for attendance tracking, verified volunteer hours, notifications, and role-based access for students, organizers, and administrators."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 0.8))
    elements.append(Spacer(1, 1.5))

    # 4.3 BugFlow
    entry_row(
        f'<b>BugFlow &mdash; Bug Tracking Platform</b>'
        f'{link_label("https://github.com/snehachavan0923/P2-bugflow_backend")}'
        f' &nbsp;<font color="{WIP_ORANGE}"><b>[In Progress]</b></font>',
        "2026 – Present"
    )
    elements.append(Paragraph("<i>React.js | Spring Boot | MongoDB | JWT | Cloudinary</i>", italic_style))
    for b in [
        "Developing multi-tenant workspace management, issue tracking, and role-based access (Super Admin, Owner, Dev, Tester).",
        "Implemented JWT authentication, bug reporting, task assignment, and issue lifecycle (Workspace → Project → Issue)."
    ]:
        elements.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        elements.append(Spacer(1, 0.8))
    elements.append(Spacer(1, 1.5))

    # ════════════════════════════════════════════
    #  5. TECHNICAL SKILLS
    # ════════════════════════════════════════════
    section_header("TECHNICAL SKILLS")
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
        elements.append(Paragraph(f"<b>{category}:</b> &nbsp;{details}", body_style))
        elements.append(Spacer(1, 0.6))
    elements.append(Spacer(1, 1.5))

    # ════════════════════════════════════════════
    #  6. EDUCATION
    # ════════════════════════════════════════════
    section_header("EDUCATION")

    # 6.1 RVCE
    entry_row("<b>RV College of Engineering (RVCE)</b>", "Sep 2026 – Present")
    elements.append(Paragraph(
        "Bachelor of Engineering (B.E.) in Computer Science &amp; Engineering &nbsp;|&nbsp; <i>Bengaluru, Karnataka, India</i>",
        italic_style
    ))
    elements.append(Spacer(1, 1))

    # 6.2 Government Polytechnic, Kalaburagi
    entry_row("<b>Government Polytechnic, Kalaburagi</b>", "Jun 2023 – Apr 2026")
    elements.append(Paragraph(
        "Diploma in Computer Science &amp; Engineering &nbsp;&middot;&nbsp; BTELINDIA &nbsp;|&nbsp; <b>CGPA: 9.97 / 10</b>",
        italic_style
    ))
    elements.append(Spacer(1, 1))

    # 6.3 Gayatri Girls High School
    entry_row("<b>Gayatri Girls High School, Gulbarga</b>", "2022 – 2023")
    elements.append(Paragraph(
        "Secondary School Leaving Certificate (SSLC) &nbsp;&middot;&nbsp; KSEEB &nbsp;|&nbsp; Score: <b>88.64%</b>",
        italic_style
    ))
    elements.append(Spacer(1, 1.5))

    # ════════════════════════════════════════════
    #  7. CERTIFICATIONS
    # ════════════════════════════════════════════
    section_header("CERTIFICATIONS")
    certs = [
        "<b>HTML5, CSS3, JavaScript, Spring REST, React.js, and Python</b> &mdash; <i>Infosys</i>",
        "<b>Hardware, Networking &amp; Cybersecurity</b> &mdash; <i>KGTTI</i>",
        "<b>Endpoint Security</b> &mdash; <i>Cisco Networking Academy</i>",
        "<b>Field Technician Computing and Peripherals (ELE/Q4601)</b> &mdash; <i>ESSCI</i>"
    ]
    for c in certs:
        elements.append(Paragraph(f"• &nbsp; {c}", body_style))
        elements.append(Spacer(1, 0.6))

    # Build document
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