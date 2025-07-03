import { Button } from "@/shared/ui/Button/Button"

interface IProps {

}

export const HeaderAddLinks = (props: IProps) => {
  return (
    <div className="header__add_links">
      <ul>
        <Button
          text="Визуализация в 3D"
        />
        <Button
          text="Собрать свою дверь"
          filled
          icon={{src: './template/images/icons/setting.svg', alt: 'Настройки'}}
        />
      </ul>
    </div>
  )
}
