import type { Locale } from './locales';
export type DocumentKind = 'privacy-policy' | 'support' | 'terms';
export type DocumentData = { title: string; lead: string; description: string; sections: { id: string; title: string; paragraphs: string[]; bullets: string[] }[] };
export const documents: Record<Locale, Record<DocumentKind, DocumentData>> = {
  "vi": {
    "privacy-policy": {
      "title": "Chính sách bảo mật",
      "lead": "Thông tin của nhân viên là phần quan trọng trong công việc mỗi ngày. Trang này giải thích các nhóm dữ liệu O-Bee sử dụng và cách liên hệ khi cần hỗ trợ.",
      "description": "Tìm hiểu dữ liệu O-Bee xử lý, cách dùng vị trí khi chấm công, việc lưu trữ và chia sẻ, cùng cách yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu.",
      "sections": [
        {
          "id": "pham-vi",
          "title": "Phạm vi áp dụng",
          "paragraphs": [
            "Chính sách này áp dụng cho website giới thiệu O-Bee và ứng dụng O-Bee dùng trong tổ chức. Tài khoản O-Bee thường do tổ chức của bạn cấp và quản lý. Tổ chức quyết định ai được truy cập dữ liệu nhân sự và nghiệp vụ trong phạm vi của mình.",
            "Website giới thiệu không yêu cầu đăng ký tài khoản hoặc gửi biểu mẫu. Khi bạn chủ động gửi email cho chúng tôi, nội dung và địa chỉ email đó được dùng để phản hồi yêu cầu của bạn."
          ],
          "bullets": []
        },
        {
          "id": "du-lieu",
          "title": "Dữ liệu được xử lý",
          "paragraphs": [
            "Tùy vai trò và tính năng tổ chức sử dụng, O-Bee có thể xử lý:"
          ],
          "bullets": [
            "Thông tin tài khoản và hồ sơ nhân viên như tên, email, đơn vị, vị trí và các trường hồ sơ do tổ chức cung cấp.",
            "Dữ liệu phân ca, thời gian chấm công, yêu cầu nghỉ phép, lịch, thông báo và dữ liệu công việc được tạo trong ứng dụng.",
            "Dữ liệu kỹ thuật cần cho đăng nhập, bảo mật và vận hành dịch vụ, bao gồm địa chỉ IP và thông tin phiên truy cập.",
            "Nội dung bạn gửi qua email hỗ trợ, nếu bạn chủ động liên hệ."
          ]
        },
        {
          "id": "vi-tri",
          "title": "Vị trí và chấm công",
          "paragraphs": [
            "Khi bạn chấm công trên thiết bị di động, O-Bee có thể xin quyền truy cập vị trí trong lúc ứng dụng đang được sử dụng. Nếu bạn cho phép, tọa độ có thể được gửi cùng lần chấm công để kiểm tra địa điểm hợp lệ và lưu trong bản ghi chấm công. Hệ thống cũng có thể dùng địa chỉ IP của yêu cầu theo quy tắc chấm công do tổ chức cấu hình.",
            "Việc cho phép vị trí phụ thuộc vào cài đặt thiết bị. Nếu không cấp quyền, khả năng chấm công sẽ phụ thuộc vào quy tắc địa điểm hoặc IP của tổ chức. Ứng dụng chỉ yêu cầu quyền vị trí khi đang được sử dụng, không yêu cầu quyền vị trí trong nền."
          ],
          "bullets": []
        },
        {
          "id": "muc-dich",
          "title": "Mục đích sử dụng",
          "paragraphs": [
            "Dữ liệu được dùng để xác thực tài khoản, hiển thị hồ sơ và cơ cấu tổ chức, phân ca, ghi nhận chấm công, xử lý nghỉ phép, hiển thị lịch và thông báo, hỗ trợ người dùng, giữ an toàn hệ thống và đáp ứng nghĩa vụ vận hành liên quan."
          ],
          "bullets": []
        },
        {
          "id": "luu-tru",
          "title": "Lưu trữ và chia sẻ",
          "paragraphs": [
            "Dữ liệu nghiệp vụ được lưu trong hệ thống O-Bee để tổ chức có thể vận hành và tra cứu theo quyền truy cập đã cấp. Người quản trị, người quản lý và người được phân quyền trong tổ chức có thể xem dữ liệu phù hợp với nhiệm vụ của họ.",
            "Việc cung cấp dữ liệu cho bên vận hành hạ tầng hoặc bên thứ ba, nếu có, phải phục vụ vận hành dịch vụ hoặc tuân thủ yêu cầu hợp pháp. Thời hạn lưu giữ cụ thể phụ thuộc vào thỏa thuận vận hành với tổ chức và nghĩa vụ áp dụng; bạn có thể yêu cầu thông tin về trường hợp của mình qua kênh liên hệ bên dưới."
          ],
          "bullets": []
        },
        {
          "id": "quyen",
          "title": "Quyền của người dùng",
          "paragraphs": [
            "Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình, tùy phạm vi quyền của tổ chức và nghĩa vụ lưu giữ áp dụng. Một số trường hồ sơ cá nhân có thể được chỉnh sửa trong ứng dụng; thông tin về việc làm và quyền truy cập do quản trị viên tổ chức quản lý.",
            "Đối với tài khoản do tổ chức cấp, hãy liên hệ quản trị viên hoặc bộ phận nhân sự của tổ chức trước. Nếu cần hỗ trợ thêm, gửi email cho O-Bee. Chúng tôi có thể cần xác minh yêu cầu và phối hợp với tổ chức trước khi thực hiện thay đổi hoặc xóa dữ liệu."
          ],
          "bullets": []
        },
        {
          "id": "lien-he",
          "title": "Liên hệ về dữ liệu",
          "paragraphs": [
            "Gửi yêu cầu tới contact@ors.vn với chủ đề “Yêu cầu về dữ liệu cá nhân trên O-Bee”. Hãy mô tả dữ liệu cần xem, chỉnh sửa hoặc xóa và tên tổ chức cấp tài khoản. Tránh gửi mật khẩu hoặc mã xác thực qua email.",
            "Xem thêm Hỗ trợ và Điều khoản sử dụng."
          ],
          "bullets": []
        }
      ]
    },
    "support": {
      "title": "Chúng tôi ở đây để hỗ trợ.",
      "lead": "Nếu bạn gặp khó khăn khi sử dụng O-Bee, hãy bắt đầu với quản trị viên của tổ chức hoặc gửi thông tin cho đội ngũ hỗ trợ.",
      "description": "Liên hệ hỗ trợ O-Bee qua email, tìm cách xử lý khi ứng dụng gặp lỗi hoặc không đăng nhập được.",
      "sections": [
        {
          "id": "lien-he",
          "title": "Liên hệ hỗ trợ",
          "paragraphs": [
            "Khi gửi email, hãy nêu tên tổ chức, cách liên hệ, thiết bị hoặc trình duyệt đang dùng, thời điểm xảy ra lỗi và mô tả ngắn các bước trước khi lỗi xuất hiện. Không gửi mật khẩu hoặc mã xác thực."
          ],
          "bullets": []
        },
        {
          "id": "dang-nhap",
          "title": "Không đăng nhập được?",
          "paragraphs": [
            "Tài khoản O-Bee do tổ chức của bạn cấp. Hãy kiểm tra tên đăng nhập và kết nối mạng, sau đó liên hệ quản trị viên hoặc bộ phận nhân sự của tổ chức để xác nhận tài khoản và quyền truy cập. Nếu vấn đề vẫn còn, gửi email cho chúng tôi kèm thông báo lỗi và thời điểm bạn thử đăng nhập."
          ],
          "bullets": []
        },
        {
          "id": "loi-ung-dung",
          "title": "Ứng dụng gặp lỗi?",
          "paragraphs": [
            "Hãy thử mở lại ứng dụng hoặc tải lại trang. Nếu lỗi liên quan đến chấm công, kiểm tra quyền vị trí, kết nối mạng và địa điểm chấm công được tổ chức gán. Gửi ảnh chụp lỗi nếu có, nhưng che thông tin nhạy cảm của nhân viên khác trước khi gửi."
          ],
          "bullets": []
        },
        {
          "id": "du-lieu",
          "title": "Cần chỉnh sửa hoặc xóa dữ liệu?",
          "paragraphs": [
            "Với dữ liệu tài khoản do tổ chức quản lý, hãy bắt đầu từ quản trị viên hoặc bộ phận nhân sự. Bạn cũng có thể gửi yêu cầu tới contact@ors.vn. Xem Chính sách bảo mật để biết những thông tin nên cung cấp."
          ],
          "bullets": []
        }
      ]
    },
    "terms": {
      "title": "Điều khoản sử dụng",
      "lead": "Các điều khoản dưới đây mô tả cách sử dụng O-Bee trong phạm vi tổ chức cấp tài khoản cho bạn.",
      "description": "Điều kiện sử dụng O-Bee, tài khoản do tổ chức cấp, trách nhiệm của người dùng, giới hạn trách nhiệm và việc chấm dứt sử dụng.",
      "sections": [
        {
          "id": "dieu-kien",
          "title": "Điều kiện sử dụng",
          "paragraphs": [
            "O-Bee là công cụ hỗ trợ tổ chức quản lý thông tin nhân sự và công việc hằng ngày. Bạn chỉ sử dụng dịch vụ khi được tổ chức cấp quyền và theo quy định áp dụng tại tổ chức. Việc truy cập hoặc tiếp tục sử dụng O-Bee thể hiện sự đồng ý tuân thủ các điều khoản này."
          ],
          "bullets": []
        },
        {
          "id": "tai-khoan",
          "title": "Tài khoản do tổ chức cấp",
          "paragraphs": [
            "Tổ chức chịu trách nhiệm cấp, thay đổi và thu hồi quyền truy cập của nhân viên. Bạn cần giữ bí mật thông tin đăng nhập, không cho người khác dùng tài khoản của mình và thông báo cho quản trị viên hoặc O-Bee nếu nghi ngờ có truy cập trái phép. Quyền xem và thao tác dữ liệu phụ thuộc vào vai trò được tổ chức phân công."
          ],
          "bullets": []
        },
        {
          "id": "trach-nhiem",
          "title": "Trách nhiệm của người dùng",
          "paragraphs": [
            "Bạn cần cung cấp thông tin đúng trong phạm vi công việc, sử dụng tính năng chấm công, nghỉ phép, lịch và thông báo theo quy định của tổ chức; không truy cập dữ liệu ngoài quyền được cấp, không can thiệp trái phép vào dịch vụ và không chia sẻ thông tin nhân sự mà mình có quyền xem cho người không có thẩm quyền."
          ],
          "bullets": []
        },
        {
          "id": "dich-vu",
          "title": "Dịch vụ và giới hạn trách nhiệm",
          "paragraphs": [
            "O-Bee được cung cấp để hỗ trợ quy trình vận hành, nhưng kết quả chấm công, ngày công và nghỉ phép vẫn cần được tổ chức kiểm tra theo chính sách nhân sự của mình. Dịch vụ có thể tạm gián đoạn để bảo trì hoặc xử lý sự cố. Trong phạm vi pháp luật cho phép, Ouransoft Group không chịu trách nhiệm cho thiệt hại phát sinh từ thông tin do người dùng nhập sai, việc cấp quyền không phù hợp của tổ chức hoặc sự cố nằm ngoài khả năng kiểm soát hợp lý."
          ],
          "bullets": []
        },
        {
          "id": "cham-dut",
          "title": "Chấm dứt sử dụng",
          "paragraphs": [
            "Quyền sử dụng tài khoản có thể kết thúc khi tổ chức thu hồi quyền, chấm dứt sử dụng dịch vụ hoặc khi tài khoản vi phạm điều khoản. Việc xử lý dữ liệu sau khi ngừng dùng tài khoản được thực hiện theo Chính sách bảo mật, thỏa thuận với tổ chức và nghĩa vụ lưu giữ áp dụng."
          ],
          "bullets": []
        },
        {
          "id": "lien-he",
          "title": "Liên hệ",
          "paragraphs": [
            "Nếu cần giải thích thêm về điều khoản, hãy liên hệ contact@ors.vn hoặc xem Hỗ trợ. Website của đơn vị vận hành: ors.vn."
          ],
          "bullets": []
        }
      ]
    }
  },
  "en": {
    "privacy-policy": {
      "title": "Privacy Policy",
      "lead": "Employee information is an important part of everyday work. This page explains the data O-Bee uses and how to contact us for help.",
      "description": "Learn about the data O-Bee processes, location-based attendance, storage, sharing and requests to access, correct or delete personal data.",
      "sections": [
        {
          "id": "pham-vi",
          "title": "Scope",
          "paragraphs": [
            "This policy applies to the O-Bee introduction website and the O-Bee application used within organizations. Your O-Bee account is usually issued and managed by your organization. Your organization determines who may access its employee and operational data.",
            "The introduction website does not require account registration or form submissions. If you choose to email us, we use your email address and message to respond to your request."
          ],
          "bullets": []
        },
        {
          "id": "du-lieu",
          "title": "Data we process",
          "paragraphs": [
            "Depending on your role and the features your organization uses, O-Bee may process:"
          ],
          "bullets": [
            "Account and employee profile information such as name, email, organizational unit, position and profile fields supplied by your organization.",
            "Shift assignments, attendance times, leave requests, calendars, notifications and work data created in the application.",
            "Technical data needed for sign-in, security and service operation, including IP addresses and session information.",
            "Support email content, if you choose to contact us."
          ]
        },
        {
          "id": "vi-tri",
          "title": "Location and attendance",
          "paragraphs": [
            "When recording attendance on a mobile device, O-Bee may request location access while the app is in use. If you allow it, coordinates may be submitted with your attendance event to check the approved work location and stored in the attendance record. The system may also use the request IP address according to attendance rules configured by your organization.",
            "Location permission is controlled through your device settings. Without permission, attendance availability depends on your organization’s location or IP rules. The app requests location access only while in use, not background location access."
          ],
          "bullets": []
        },
        {
          "id": "muc-dich",
          "title": "How data is used",
          "paragraphs": [
            "Data is used to authenticate accounts, display employee profiles and organization structure, assign shifts, record attendance, process leave, display calendars and notifications, support users, protect the system and meet relevant operational obligations."
          ],
          "bullets": []
        },
        {
          "id": "luu-tru",
          "title": "Storage and sharing",
          "paragraphs": [
            "Operational data is stored in the O-Bee system so your organization can operate and review records under its assigned access permissions. Administrators, managers and authorized people in your organization may access data relevant to their responsibilities.",
            "Data provided to infrastructure operators or third parties, if any, must support service operation or meet lawful requirements. Specific retention periods depend on the operating agreement with your organization and applicable obligations. Contact us below to ask about your situation."
          ],
          "bullets": []
        },
        {
          "id": "quyen",
          "title": "Your rights",
          "paragraphs": [
            "You may request access to, correction of or deletion of your personal information, subject to your organization’s authority and applicable retention obligations. Some personal profile fields may be edited in the app; employment information and access permissions are managed by your organization’s administrator.",
            "For an organization-issued account, contact your administrator or HR team first. If you need further help, email O-Bee. We may need to verify your request and coordinate with your organization before changing or deleting data."
          ],
          "bullets": []
        },
        {
          "id": "lien-he",
          "title": "Data requests",
          "paragraphs": [
            "Email contact@ors.vn with the subject “O-Bee personal data request”. Describe the data you want to access, correct or delete, and name the organization that issued your account. Do not send passwords or verification codes by email.",
            "See also Support and Terms of Use."
          ],
          "bullets": []
        }
      ]
    },
    "support": {
      "title": "We’re here to help.",
      "lead": "If you have trouble using O-Bee, start with your organization’s administrator or send details to our support team.",
      "description": "Contact O-Bee support by email and find guidance for application errors or sign-in problems.",
      "sections": [
        {
          "id": "lien-he",
          "title": "Contact support",
          "paragraphs": [
            "When emailing us, include your organization’s name, contact details, device or browser, the time of the error and a short description of the steps leading to it. Do not send passwords or verification codes."
          ],
          "bullets": []
        },
        {
          "id": "dang-nhap",
          "title": "Unable to sign in?",
          "paragraphs": [
            "Your O-Bee account is issued by your organization. Check your username and internet connection, then contact your administrator or HR team to confirm your account and access permissions. If the problem continues, email us with the error message and the time of your sign-in attempt."
          ],
          "bullets": []
        },
        {
          "id": "loi-ung-dung",
          "title": "An application error?",
          "paragraphs": [
            "Try reopening the app or reloading the page. For attendance issues, check location permissions, your connection and the attendance location assigned by your organization. Attach a screenshot if available, but hide sensitive information about other employees first."
          ],
          "bullets": []
        },
        {
          "id": "du-lieu",
          "title": "Need to correct or delete data?",
          "paragraphs": [
            "For account data managed by your organization, start with your administrator or HR team. You can also email contact@ors.vn. Read the Privacy Policy for the information to include in your request."
          ],
          "bullets": []
        }
      ]
    },
    "terms": {
      "title": "Terms of Use",
      "lead": "These terms describe how to use O-Bee within the organization that issued your account.",
      "description": "Conditions for using O-Bee, organization-issued accounts, user responsibilities, liability limits and termination of access.",
      "sections": [
        {
          "id": "dieu-kien",
          "title": "Conditions of use",
          "paragraphs": [
            "O-Bee helps organizations manage employee information and everyday work. Use the service only with authorization from your organization and in accordance with its applicable rules. Accessing or continuing to use O-Bee indicates agreement to these terms."
          ],
          "bullets": []
        },
        {
          "id": "tai-khoan",
          "title": "Organization-issued accounts",
          "paragraphs": [
            "Your organization is responsible for issuing, changing and revoking employee access. Keep your sign-in details confidential, do not let others use your account, and notify your administrator or O-Bee if you suspect unauthorized access. Your ability to view or change data depends on your assigned role."
          ],
          "bullets": []
        },
        {
          "id": "trach-nhiem",
          "title": "User responsibilities",
          "paragraphs": [
            "Provide accurate information within your work responsibilities and use attendance, leave, calendars and notifications according to your organization’s rules. Do not access data beyond your permissions, interfere with the service without authorization or share employee information with unauthorized people."
          ],
          "bullets": []
        },
        {
          "id": "dich-vu",
          "title": "Service and liability limits",
          "paragraphs": [
            "O-Bee supports operational processes, but your organization must still review attendance, workday and leave results under its own HR policies. The service may be temporarily interrupted for maintenance or incident response. To the extent permitted by law, Ouransoft Group is not responsible for losses caused by incorrect user input, inappropriate access permissions granted by an organization or events beyond reasonable control."
          ],
          "bullets": []
        },
        {
          "id": "cham-dut",
          "title": "Termination of access",
          "paragraphs": [
            "Account access may end when your organization revokes permissions, stops using the service or an account breaches these terms. Data after account use ends is handled according to the Privacy Policy, the agreement with your organization and applicable retention obligations."
          ],
          "bullets": []
        },
        {
          "id": "lien-he",
          "title": "Contact",
          "paragraphs": [
            "For questions about these terms, contact contact@ors.vn or visit Support. The service operator’s website is ors.vn."
          ],
          "bullets": []
        }
      ]
    }
  }
};

