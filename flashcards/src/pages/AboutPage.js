import { Divider } from '@mui/material'
import { BASE_URL } from 'config/paths'
import React from 'react'

export default function AboutPage()
{
    return (
        <div className="page-container">
            <div className='mb-3'>
                <h1 className="text-center">About</h1>
                <p>This application was developed during bachelor thesis at CTU Prague by student Daniel Poustka for study purposes.</p>
            </div>
            <Divider />
            <div className='mt-5' id='cpolicy'>
                <h1 className="text-center">Cookies Policy</h1>
                <h3>Definitions</h3>
                <ul>
                    <li>
                        <b>Account</b> means a unique account created for You to access our Service or parts of our Service.
                    </li>
                    <li>
                        <b>Company</b> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Flashcard app developer.
                    </li>
                    <li>
                        <b>Cookies</b> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                    </li>
                    <li>
                        <b>Service</b> refers to the Website.
                    </li>
                    <li>
                        <b>Website</b> refers to Flashcard app, accessible from {BASE_URL}
                    </li>
                    <li>
                        <b>You</b> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </li>
                </ul>
                <h3>Tracking Technologies and Cookies</h3>
                <p>
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.
                    The technologies We use may include:
                </p>
                <ul>
                    <li>
                        <b>Cookies or Browser Cookies.</b> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                    </li>
                </ul>
                <p>
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                </p>
                <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                <ul>
                    <li>
                        <b>Necessary / Essential Cookies</b>
                        <p>Type: Session Cookies</p>
                        <p>Administered by: Us</p>
                        <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                    </li>
                    <li>
                        <b>Cookies Policy / Notice Acceptance Cookies</b>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Us</p>
                        <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                    </li>
                    <li>
                        <b>Functionality Cookies</b>
                        <p>Type: Session Cookies</p>
                        <p>Administered by: Us</p>
                        <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                    </li>
                </ul>
                <Divider />
                <h1 id='ppolicy'>Privacy Policy</h1>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                <ul>
                    <li>Email address</li>
                    <li>Username</li>
                </ul>
                <h2>User of Your Personal Data</h2>
                The Company may use Personal Data for the following purposes:
                <ul>
                    <li>
                        <b>To provide and maintain our Service</b>, including to monitor the usage of our Service.
                    </li>
                    <li>
                        <b>To manage Your Account:</b> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                    </li>
                    <li>
                        <b>To contact You:</b> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                    </li>
                    <li>
                        <b>To manage Your requests:</b> To attend and manage Your requests to Us.
                    </li>
                </ul>
            </div>
            <Divider />
            <div className='mt-5' aria-hidden="true">&nbsp;</div>
        </div>
    )
}
