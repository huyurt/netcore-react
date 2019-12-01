using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Şifre en az 6 karakter olabilir.")
            .Matches("[A-Z]").WithMessage("Şifre en az bir büyük harf içermeli.")
            .Matches("[a-z]").WithMessage("Şifre en az bir küçük harf içermeli.")
            .Matches("[0-9]").WithMessage("Şifre en az bir rakam içermeli.")
            .Matches("[^a-zA-Z0-9]").WithMessage("Şifre harf ve rakamlardan oluşabilir.");

            return options;
        }
    }
}