export const post = {
  id: "1",
  title: "Phát hiện các cuộc tấn công web (1)",
  subtitle: "Tấn công web là gì?",
  content: `
    <h2>Tấn công web là gì?</h2>
    
    <p>Ứng dụng web là các ứng dụng cung cấp dịch vụ cho người dùng thông qua giao diện trình duyệt. Ngày nay, ứng dụng web chiếm một phần lớn trong việc sử dụng internet. Các trang web như Google, Facebook và YouTube (không bao gồm ứng dụng di động) thực chất là ứng dụng web.</p>
    
    <p>Một nghiên cứu của Acunetix cho thấy 75% các cuộc tấn công mạng đều ở cấp độ ứng dụng web. Điều này cho thấy tầm quan trọng của việc bảo mật ứng dụng web trong thời đại số hóa hiện nay.</p>
    
    <p>Các ứng dụng web hiện đại thường xử lý rất nhiều dữ liệu nhạy cảm như thông tin cá nhân, dữ liệu tài chính, và bí mật kinh doanh. Việc bảo vệ những thông tin này khỏi các cuộc tấn công mạng là vô cùng quan trọng đối với cả doanh nghiệp và người dùng.</p>

    <h2>Tại sao cần phát hiện các cuộc tấn công web?</h2>
    
    <p>Việc phát hiện sớm các cuộc tấn công web có thể giúp:</p>
    <ul>
      <li>Ngăn chặn việc rò rỉ dữ liệu nhạy cảm</li>
      <li>Bảo vệ uy tín và thương hiệu của doanh nghiệp</li>
      <li>Tuân thủ các quy định pháp lý về bảo mật dữ liệu</li>
      <li>Tiết kiệm chi phí khắc phục sau khi bị tấn công</li>
    </ul>

    <h3>Thống kê về các cuộc tấn công web</h3>
    
    <p>Theo báo cáo bảo mật web năm 2023, có hơn 40% các doanh nghiệp đã từng trải qua ít nhất một cuộc tấn công web nghiêm trọng. Trong số đó:</p>
    <ul>
      <li>68% các cuộc tấn công nhắm vào lỗ hổng ứng dụng web</li>
      <li>25% các vụ vi phạm dữ liệu bắt nguồn từ các lỗ hổng web</li>
      <li>Thiệt hại trung bình cho mỗi vụ tấn công là 4.45 triệu USD</li>
    </ul>
    
    <h2>Các loại tấn công web phổ biến</h2>
    
    <p>Dưới đây là một số phương pháp tấn công được sử dụng để xâm nhập vào các ứng dụng web:</p>
    
    <h3>SQL Injection</h3>
    
    <p>SQL Injection là một kỹ thuật tấn công phổ biến nhất hiện nay. Kẻ tấn công sẽ chèn các câu lệnh SQL độc hại vào các trường input của ứng dụng web để truy cập trái phép vào cơ sở dữ liệu.</p>
    
    <h4>Cách thức hoạt động của SQL Injection</h4>
    
    <p>SQL Injection xảy ra khi ứng dụng web không kiểm tra và xác thực đầu vào từ người dùng một cách đúng đắn. Kẻ tấn công có thể:</p>
    <ul>
      <li>Truy xuất dữ liệu nhạy cảm từ cơ sở dữ liệu</li>
      <li>Thêm, sửa, xóa dữ liệu trong database</li>
      <li>Thực thi các lệnh hệ thống trên server</li>
      <li>Bypass các cơ chế xác thực và ủy quyền</li>
    </ul>

    <h4>Ví dụ về SQL Injection</h4>
    
    <p>Một ví dụ đơn giản về SQL Injection:</p>
    <pre><code>
// Câu truy vấn không an toàn
String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

// Nếu kẻ tấn công nhập: admin' OR '1'='1' --
// Câu truy vấn sẽ trở thành:
SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = ''
    </code></pre>

    <h4>Cách phòng chống SQL Injection</h4>
    
    <ul>
      <li>Sử dụng Prepared Statements và Parameterized Queries</li>
      <li>Validate và sanitize tất cả đầu vào từ người dùng</li>
      <li>Sử dụng stored procedures an toàn</li>
      <li>Áp dụng nguyên tắc least privilege cho database user</li>
      <li>Thường xuyên cập nhật và patch hệ thống</li>
    </ul>
    
    <h3>Cross-Site Scripting (XSS)</h3>
    
    <p>XSS cho phép kẻ tấn công chèn mã JavaScript độc hại vào trang web, mã này sẽ được thực thi trong trình duyệt của người dùng khác khi họ truy cập trang web đó.</p>

    <h4>Các loại XSS Attack</h4>
    
    <h5>Reflected XSS</h5>
    <p>Đây là loại XSS phổ biến nhất, xảy ra khi dữ liệu đầu vào của người dùng được phản hồi ngay lập tức trong response mà không được kiểm tra hoặc mã hóa đúng cách.</p>
    
    <h5>Stored XSS</h5>
    <p>Loại này nguy hiểm hơn vì mã độc được lưu trữ vĩnh viễn trên server (trong database, file, hoặc các vị trí lưu trữ khác) và được thực thi mỗi khi người dùng truy cập trang chứa dữ liệu đó.</p>
    
    <h5>DOM-based XSS</h5>
    <p>Xảy ra khi JavaScript trong trang web thực thi code một cách không an toàn, thường thông qua việc xử lý dữ liệu từ DOM mà không kiểm tra đúng cách.</p>

    <h4>Tác hại của XSS</h4>
    
    <ul>
      <li>Đánh cắp session cookies và hijack tài khoản người dùng</li>
      <li>Chuyển hướng người dùng đến trang web độc hại</li>
      <li>Thu thập thông tin nhạy cảm như mật khẩu, thông tin cá nhân</li>
      <li>Thực hiện các hành động thay mặt người dùng</li>
      <li>Phát tán malware hoặc virus</li>
    </ul>

    <h4>Phòng chống XSS</h4>
    
    <ul>
      <li>Encode tất cả output trước khi hiển thị</li>
      <li>Validate và sanitize input từ người dùng</li>
      <li>Sử dụng Content Security Policy (CSP)</li>
      <li>Tránh sử dụng các hàm JavaScript nguy hiểm như eval(), innerHTML</li>
      <li>Sử dụng HTTPOnly cookies</li>
    </ul>
    
    <h3>Cross-Site Request Forgery (CSRF)</h3>
    
    <p>CSRF buộc người dùng đã đăng nhập thực hiện các hành động không mong muốn trên ứng dụng web mà họ đang được xác thực.</p>

    <h4>Cách thức hoạt động của CSRF</h4>
    
    <p>Cuộc tấn công CSRF thường diễn ra theo các bước sau:</p>
    <ol>
      <li>Người dùng đăng nhập vào một trang web đáng tin cậy (ví dụ: ngân hàng)</li>
      <li>Kẻ tấn công lừa người dùng truy cập vào trang web độc hại</li>
      <li>Trang web độc hại gửi request đến trang web đáng tin cậy</li>
      <li>Do người dùng vẫn đang đăng nhập, request được thực thi</li>
    </ol>

    <h4>Ví dụ về CSRF Attack</h4>
    
    <pre><code>
// Kẻ tấn công có thể tạo một form ẩn:
&lt;form action="https://bank.com/transfer" method="POST" style="display:none"&gt;
  &lt;input name="to" value="attacker_account"&gt;
  &lt;input name="amount" value="10000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit();&lt;/script&gt;
    </code></pre>

    <h4>Phòng chống CSRF</h4>
    
    <ul>
      <li>Sử dụng CSRF tokens trong tất cả forms</li>
      <li>Kiểm tra Referer header</li>
      <li>Sử dụng SameSite cookies</li>
      <li>Yêu cầu xác thực lại cho các hành động quan trọng</li>
      <li>Sử dụng CAPTCHA cho các giao dịch nhạy cảm</li>
    </ul>

    <h2>Công cụ phát hiện tấn công web</h2>
    
    <h3>Web Application Firewall (WAF)</h3>
    
    <p>WAF là một lớp bảo vệ đặt giữa ứng dụng web và internet, giúp lọc, giám sát và chặn các traffic HTTP độc hại.</p>

    <h4>Các loại WAF</h4>
    
    <h5>Network-based WAF</h5>
    <p>Được triển khai trên hardware, thường đặt tại data center để giảm độ trễ.</p>
    
    <h5>Host-based WAF</h5>
    <p>Được tích hợp hoàn toàn vào phần mềm ứng dụng, cho phép tùy chỉnh cao nhưng tốn tài nguyên server.</p>
    
    <h5>Cloud-based WAF</h5>
    <p>Được cung cấp như một dịch vụ cloud, dễ triển khai và có chi phí thấp.</p>

    <h3>Intrusion Detection System (IDS)</h3>
    
    <p>IDS giám sát lưu lượng mạng và hoạt động hệ thống để phát hiện các dấu hiệu của cuộc tấn công.</p>

    <h4>Signature-based Detection</h4>
    <p>Phát hiện dựa trên các pattern đã biết của các cuộc tấn công.</p>

    <h4>Anomaly-based Detection</h4>
    <p>Phát hiện dựa trên việc so sánh với baseline behavior bình thường.</p>

    <h2>Kết luận</h2>
    
    <p>Việc phát hiện và ngăn chặn các cuộc tấn công web là một nhiệm vụ quan trọng và liên tục. Với sự phát triển không ngừng của công nghệ, các phương thức tấn công cũng ngày càng tinh vi và đa dạng.</p>
    
    <p>Để bảo vệ hiệu quả, các tổ chức cần:</p>
    <ul>
      <li>Thực hiện security testing thường xuyên</li>
      <li>Cập nhật kiến thức về các threat mới</li>
      <li>Triển khai các giải pháp bảo mật đa lớp</li>
      <li>Đào tạo đội ngũ phát triển về secure coding</li>
      <li>Có kế hoạch phản ứng sự cố rõ ràng</li>
    </ul>
    
    <p>Trong phần tiếp theo của series này, chúng ta sẽ đi sâu vào các kỹ thuật phát hiện SQL Injection cụ thể và cách triển khai các biện pháp phòng chống hiệu quả.</p>
  `,
  author: "Le Van Manh",
  publishedDate: "15 phút đọc",
  readTime: "2 giờ trước",
  views: 156,
  comments: 8,
  bookmarks: 23,
  tags: ["OWASP", "Web Security", "Cybersecurity", "SQL Injection", "XSS", "CSRF"],
  series: "Phát hiện các cuộc tấn công SQL Injection",
};

export const markdown = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
<p>
        These <span data-type="emoji" data-name="smiley"></span>
        are <span data-type="emoji" data-name="fire"></span>
        some <span data-type="emoji" data-name="smiley_cat"></span>
        emojis <span data-type="emoji" data-name="exploding_head"></span>
        rendered <span data-type="emoji" data-name="ghost"></span>
        as <span data-type="emoji" data-name="massage"></span>
        inline <span data-type="emoji" data-name="v"></span>
        nodes.
      </p>
      <p>
        Type <code>:</code> to open the autocomplete.
      </p>
      <p>
        Even <span data-type="emoji" data-name="octocat"></span>
        custom <span data-type="emoji" data-name="trollface"></span>
        emojis <span data-type="emoji" data-name="neckbeard"></span>
        are <span data-type="emoji" data-name="rage1"></span>
        supported.
      </p>
      <p>
        And unsupported emojis (without a fallback image) are rendered as just the shortcode <span data-type="emoji" data-name="this_does_not_exist"></span>.
      </p>
      <pre><code>In code blocks all emojis are rendered as plain text. 👩‍💻👨‍💻</code></pre>
      <p>
        There is also support for emoticons. Try typing <code><3</code>.
      </p>
       <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
`;
