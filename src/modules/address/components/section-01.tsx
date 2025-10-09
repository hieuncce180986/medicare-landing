"use client";

import { useState } from "react";
import { ROUTES } from "@/utils/route";
import React from "react";
import { AccountService } from "@/services/account";
import { HELPER } from "@/utils/helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

export interface Province {
  code: number;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}

export interface UserData {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

export interface FormData extends UserData {
  ward: number;
  district: number;
  province: number;
}

export interface CustomerAccount {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  role: string;
  status: boolean;
  created_at: string;
  districtName: string;
  provinceName: string;
  wardName: string;
}

const Section01 = () => {
  // ADDRESS
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = React.useState("");
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
  const [districtSearchTerm, setDistrictSearchTerm] = useState("");
  const [wardSearchTerm, setWardSearchTerm] = useState("");
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    address: "",
    ward: 0,
    district: 0,
    province: 0,
  });

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      const originalUrl = URL.createObjectURL(file);
      setOriginalImage(originalUrl);
      setCurrentImage(originalUrl);
      setIsImageLoaded(true);
    }
  };

  React.useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );

      if (selectedProvince) {
        setDistricts(selectedProvince.districts);
        const selectedDistrict = selectedProvince.districts.find(
          (d) => d.code === formData.district
        );
        setProvince(selectedProvince.name);
        if (selectedDistrict) {
          setDistrict(selectedDistrict.name);
          setWards(selectedDistrict.wards);
          const selectedWard = selectedDistrict.wards.find(
            (w) => w.code === Number(formData.ward)
          );
          if (selectedWard) {
            setWard(selectedWard.name);
          }
        }
      }
    }
  }, [formData.province, formData.district, provinces, formData.ward]);

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  React.useEffect(() => {
    if (formData.province && provinces.length > 0) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );
      if (selectedProvince) {
        setProvince(selectedProvince.name);
        setDistricts(selectedProvince.districts);

        if (formData.district) {
          const selectedDistrict = selectedProvince.districts.find(
            (d) => d.code === formData.district
          );
          if (selectedDistrict) {
            setDistrict(selectedDistrict.name);
            setWards(selectedDistrict.wards);

            if (formData.ward) {
              const selectedWard = selectedDistrict.wards.find(
                (w) => w.code === formData.ward
              );
              if (selectedWard) {
                setWard(selectedWard.name);
              } else {
                setWard("Vui lòng chọn Phường/Xã");
                setFormData((prev) => ({ ...prev, ward: 0 }));
              }
            } else {
              setWard("Vui lòng chọn Phường/Xã");
              setFormData((prev) => ({ ...prev, ward: 0 }));
            }
          } else {
            setDistrict("Vui lòng chọn Quận/Huyện");
            setWards([]);
            setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
          }
        } else {
          setDistrict("Vui lòng chọn Quận/Huyện");
          setWards([]);
          setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
        }
      } else {
        setProvince("Vui lòng chọn Tỉnh/Thành phố");
        setDistricts([]);
        setWards([]);
        setFormData((prev) => ({ ...prev, province: 0, district: 0, ward: 0 }));
      }
    }
  }, [formData.province, formData.district, formData.ward, provinces]);

  const handleProvinceChange = (provinceCode: string) => {
    const selectedProvince = provinces.find(
      (p) => p.code === Number(provinceCode)
    );
    if (selectedProvince) {
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: Number(provinceCode),
        district: 0,
        ward: 0,
      }));
      setProvince(selectedProvince.name);
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
      setOpenProvinces(false);
    } else {
      setDistricts([]);
      setWards([]);
      setFormData((prev) => ({ ...prev, province: 0, district: 0, ward: 0 }));
      setProvince("Vui lòng chọn Tỉnh/Thành phố");
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find(
      (d) => d.code === Number(districtCode)
    );
    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: Number(districtCode),
        ward: 0,
      }));
      setDistrict(selectedDistrict.name);
      setWard("Vui lòng chọn Phường/Xã");
      setOpenDistrict(false);
    } else {
      setWards([]);
      setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  const handleWardChange = (wardCode: String) => {
    const selectedWard = wards.find((w) => w.code === Number(wardCode));
    if (selectedWard) {
      setFormData((prev) => ({
        ...prev,
        ward: Number(wardCode),
      }));
      setWard(selectedWard.name);
      setOpenWard(false);
    } else {
      setFormData((prev) => ({ ...prev, ward: 0 }));
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  const handleProvinceSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProvinceSearchTerm(e.target.value);
  };

  const handleDistrictSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistrictSearchTerm(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl w-full mx-auto py-5 lg:py-10 px-5 lg:px-0">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden lg:grid w-full md:w-1/2">
          <div>
            <div className="mt-6">
              <div className="flex flex-row items-center gap-2 relative mb-3.5 z-20">
                <MapPin className="w-5 h-5" />
                <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                  Địa chỉ nhận hàng
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="province"
                    className="text-black text-[16px] font-light"
                  >
                    Tỉnh/Thành phố:
                  </Label>
                  <Select
                    value={formData.province ? String(formData.province) : ""}
                    onValueChange={handleProvinceChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces
                        .sort((a, b) => a.name.localeCompare(b.name, "vi-VN"))
                        .map((province) => (
                          <SelectItem
                            key={province.code}
                            value={String(province.code)}
                          >
                            {HELPER.formatProvinceName(province.name)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="district"
                    className="text-black text-[16px] font-light"
                  >
                    Quận/Huyện:
                  </Label>
                  <Select
                    value={formData.district ? String(formData.district) : ""}
                    onValueChange={handleDistrictChange}
                    disabled={!formData.province || loading}
                  >
                    <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                      <SelectValue placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts
                        .sort((a, b) =>
                          HELPER.getNameForSorting(a.name).localeCompare(
                            HELPER.getNameForSorting(b.name),
                            "vi-VN"
                          )
                        )
                        .map((district) => (
                          <SelectItem
                            key={district.code}
                            value={String(district.code)}
                          >
                            {district.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <Label
                  htmlFor="ward"
                  className="text-black text-[16px] font-light"
                >
                  Phường/Xã:
                </Label>
                <Select
                  value={formData.ward ? String(formData.ward) : ""}
                  onValueChange={handleWardChange}
                  disabled={!formData.district || loading}
                >
                  <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                    <SelectValue placeholder="Chọn Phường/Xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards
                      .sort((a, b) =>
                        HELPER.getNameForSorting(a.name).localeCompare(
                          HELPER.getNameForSorting(b.name),
                          "vi-VN"
                        )
                      )
                      .map((ward) => (
                        <SelectItem key={ward.code} value={String(ward.code)}>
                          {ward.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-0">
                <Label
                  htmlFor="address"
                  className="text-black text-[16px] font-light"
                >
                  Số nhà, tên đường:
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Ví dụ: 123 Đường ABC"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-2 text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section01;
