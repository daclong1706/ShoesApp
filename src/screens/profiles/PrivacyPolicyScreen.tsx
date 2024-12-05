import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import ContaineProfile from './components/ContainerProfile';
import {appColors} from '../../constants/appColor';
import {FooterComponent, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const PrivacyPolicyScreen = () => {
  return (
    <ContaineProfile title="Chính Sách Bảo Mật">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Phần 1 */}
          <TextComponent
            text="1. Loại Thông Tin Chúng Tôi Thu Thập"
            size={18}
            font={fontFamilies.medium}
            styles={{marginBottom: 12}}
          />
          <TextComponent
            text="Chúng tôi thu thập các thông tin cá nhân mà bạn cung cấp khi sử dụng ứng dụng của chúng tôi, bao gồm nhưng không giới hạn thông tin như tên, địa chỉ email, số điện thoại và thông tin vị trí."
            size={16}
            styles={{marginBottom: 16}}
          />

          {/* Phần 2 */}
          <TextComponent
            text="2. Sử Dụng Thông Tin Cá Nhân Của Bạn"
            size={18}
            font={fontFamilies.medium}
            styles={{marginVertical: 12}}
          />
          <TextComponent
            text="Thông tin cá nhân của bạn sẽ được sử dụng để cải thiện dịch vụ, cung cấp hỗ trợ khách hàng và gửi các thông báo liên quan đến tài khoản của bạn. Chúng tôi cũng có thể sử dụng thông tin để phân tích và nâng cao trải nghiệm người dùng."
            size={16}
            styles={{marginBottom: 16}}
          />

          {/* Phần 3 */}
          <TextComponent
            text="3. Chia Sẻ Thông Tin Cá Nhân"
            size={18}
            font={fontFamilies.medium}
            styles={{marginVertical: 12}}
          />
          <TextComponent
            text="Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn cho bên thứ ba mà không có sự đồng ý của bạn, ngoại trừ các trường hợp yêu cầu pháp lý hoặc bảo vệ quyền lợi của công ty."
            size={16}
            styles={{marginBottom: 16}}
          />

          {/* Phần 4 */}
          <TextComponent
            text="4. Bảo Mật Thông Tin"
            size={18}
            font={fontFamilies.medium}
            styles={{marginVertical: 12}}
          />
          <TextComponent
            text="Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc tiết lộ."
            size={16}
            styles={{marginBottom: 16}}
          />

          {/* Phần 5 */}
          <TextComponent
            text="5. Quyền Của Bạn Đối Với Thông Tin Cá Nhân"
            size={18}
            font={fontFamilies.medium}
            styles={{marginVertical: 12}}
          />
          <TextComponent
            text="Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào. Vui lòng liên hệ với chúng tôi nếu bạn cần hỗ trợ."
            size={16}
            styles={{marginBottom: 16}}
          />

          {/* Phần 6 */}
          <TextComponent
            text="6. Liên Hệ"
            size={18}
            font={fontFamilies.medium}
            styles={{marginVertical: 12}}
          />
          <TextComponent
            text="Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email: daclong.k17@gmail.com"
            size={16}
            styles={{marginBottom: 16}}
          />
          <FooterComponent />
        </ScrollView>
      </View>
    </ContaineProfile>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});

export default PrivacyPolicyScreen;
