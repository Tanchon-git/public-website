"use client";

import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { TikTokOutlined, XOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gd-red via-primary to-gd-yellow ">
      <div className="max-w-7xl mx-auto px-8 md:px-4 py-8">
        <div className="pb-6">
          <Image
            src="/logo/logo-white.PNG"
            alt="united tu party logo"
            width={150}
            height={150}
          />
        </div>

        <div className="md:flex md:flex-wrap md:justify-between space-y-4 md:space-y-0 text-white">
          <div>
            <h4 className="mb-2">ติดต่อเรา</h4>
            <ul className="footer-text">
              <li className="footer-li">
                <Instagram />
                <a
                  target="_blank"
                  href="https://www.instagram.com/unitedtu.party?igsh=MXl4eG1kenFoYW14"
                >
                  @unitedtu.party
                </a>
              </li>

              <li className="footer-li">
                <Facebook />
                <a
                  target="_blank"
                  href="https://www.facebook.com/share/16GgV7EJdZ/?mibextid=wwXIfr"
                >
                  พรรคธรรมด้วยกัน United TU
                </a>
              </li>

              <li className="footer-li">
                <XOutlined />
                <a
                  target="_blank"
                  href="https://x.com/unitedtu_party?s=21&t=XpXud_Si21HBkJo2GcewEg"
                >
                  @UnitedTU_Party
                </a>
              </li>

              <li className="footer-li">
                <TikTokOutlined />
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@unitedtu.party?_t=ZS-8vpK5PaKHfM&_r=1"
                >
                  @unitedtu.party
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left md:text-center">
            <h4 className="mb-2">
              พรรคธรรมด้วยกัน<br></br>
              มหาวิทยาลัยธรรมศาสตร์
            </h4>
            <p className="footer-text">
              เลขที่ 99 หมู่ 18 ถนนพหลโยธิน
              <br />
              ตำบลคลองหนึ่ง อำเภอคลองหลวง
              <br />
              จังหวัดปทุมธานี 12120
            </p>
          </div>

          <div className="text-left md:text-right">
            <h4 className="mb-2">ผู้พัฒนา</h4>
            <div className="pb-2">
              <p className="footer-subtitle">Full-Stack Developer:</p>
              <p className="footer-subtitle">
                Tanchon<br></br>chonchanok.cr@gmail.com
              </p>
            </div>
            <div>
              <p className="footer-subtitle">UX/UI Designer:</p>
              <p className="footer-subtitle">Rath Nam</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 bg-primary">
        <p className="footer-copyright text-center">
          Copyright &copy; {new Date().getFullYear()} พรรคธรรมด้วยกัน. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
